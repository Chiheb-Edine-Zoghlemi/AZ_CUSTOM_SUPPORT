var UserProfile = (function() {

  
    var getemail = function() {
      return sessionStorage.getItem("email");   
    };
    
    var setemail = function(e) {     
        sessionStorage.setItem("email", e);
    };
    var getorder = function() {
        return sessionStorage.getItem("order");    
      };
      var setorder = function(o) {
        sessionStorage.setItem("order", o);
    };
    var clear_all = () => {
        sessionStorage.clear();
    }
  
    return {
        getemail: getemail,
        setemail: setemail,
        getorder: getorder,
        setorder: setorder,
        clear_all:clear_all
    }
  
  })();
  
  export default UserProfile;