module.exports = function(corsenable, allowed_domains, headers){
   return function(req, res, next){
      if(corsenable){
         res.header("Access-Control-Allow-Credentials", true);
         if(allowed_domains){
           res.header("Access-Control-Allow-Origin", allowed_domains);
         }
         else{
           res.header("Access-Control-Allow-Origin", "*");
         }
         if(headers){
           res.header("Access-Control-Expose-Headers", headers);
         }
      }
      next();
   }
}
