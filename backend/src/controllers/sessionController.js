import Session from "../models/Session.js";
import { streamClient,chatClient } from "../lib/stream.js";
export async function createSessions(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkid;
    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ msg: "problem and difficulty are required" });
    }

    const callId = `session_${Date.now()}_Math.random().toString(36).substring(7)}`;
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });
    await streamClient.video.call("default",callId),getOrCreate({
        data:{
            created_by_id:clerkId,
            custom:{sessionId:session._id.toString()}
        },
    })
    const channel=chatClient.channel("messaging",callId,{
        name:`${problem} Session`,
        created_by_id:clerkId,
        members:[clerkId]
    })
    await channel.create();
  } catch (error) {}
}
export async function getActiveSessions(req, res) {
  try{
    const sessions=await Session.find({status:"active"}).populate("host","name profileImage email clerkId")
    .sort({createdAt:-1})
    .limit(20);
    res.status(200).json(sessions);
  }
  catch(error){
    res.status(500).json({msg:"Server Error"})
  }
}
export async function getMyRecentSessions(_, res) {
  try{
    const userId=req.user._id;
    const sessions=await Session.find({status:"completed",
      $or:[{host:userId},{participant:userId}]
    }).sort({createdAt:-1}).limit(20);
    res.status(200).json(sessions);
  }
    catch(error){
    res.status(500).json({msg:"Server Error"})
    }
  }
export async function getSessionsById(req, res) {
  try{
    const{id}=req.params
    const session=await Sessions.findById(id).populate("host participant","name profileImage email clerkId");
    if(!session){
        return res.status(404).json({msg:"Session not found"});
    }
  }
  catch(error){
    res.status(500).json({msg:"Server Error"})
}
}
export async function joinSession(req, res) {
  try{
    const{id}=req.params;
    const userID=req.user._id;
    const clerkId=req.user.clerkId;

    const session=await Session.findById(id);
    if(!session){
        return res.status(404).json({msg:"Session not found"});
    }
    if(session.status!=="active"){
        return res.status(400).json({msg:"Cannot join a completed session"});
    }
    if(sesion.host.toString()===userID.toString()){
        return res.status(400).json({msg:"Host cannot join their own session as participant"});
    }
    if(session.participant)return res.status(409).json({msg:"Session already has a participant"});
    session.participant=userID;
    await session.save();

    const channel=chatClient.channel("messaging",session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json(session);
  }
  catch(error){
    res.status(500).json({msg:"Server Error"})
  }
}
export async function endSession(req, res) {
  try{
    const{id}=req.params;
    const userId=req.user._id;
    const session=await Session.findById(id);
    if(!session){
        return res.status(404).json({msg:"Session not found"});
    }
    if(session.host.toString()!==userId.toString()){
        return res.status(403).json({msg:"Only host can end the session"});
    }
    if(session.status==="completed"){
        return res.status(400).json({msg:"Session already ended"});
    }
    const call=streamClient.video.call("default",session.callId);
    await call.delete({hard:true});

    const channel=chatClient.channel("messaging",session.callId);
    await channel.delete();
    session.status="completed";
    await session.save();

    res.status(200).json({msg:"Session ended successfully"});
  }
  catch(error){
    res.status(500).json({msg:"Server Error"})
  }
}
