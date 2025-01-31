const roleCheck=(allowedRoles)=async(req, res, next)=>{
 try {
    if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "Unauthorized: No user role found" });
      }

      const role=req.user.role;

    if(!allowedRoles.includes(role)){
        return res.status(403).json({message:" you don't have access to this resource"})
    }
    next();
    
 } catch (error) {
    console.log("Role check erro", error);
    return res.status(500).json({message:"Internel server Error"})
 }
}