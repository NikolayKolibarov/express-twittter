module.exports = {
    isGuest: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            next();
        }
    },
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect('/users/login')
        }
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.user) {
                let hasRole = false;
                for (let userRole of req.user.roles) {
                    if (userRole == role) {
                        hasRole = true;
                    }
                }

                if (hasRole) {
                    next()
                } else {
                    res.redirect('/users/login')
                }

            }
        }
    }
};