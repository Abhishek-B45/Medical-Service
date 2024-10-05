// checkDataScope.js
const checkDataScope = (requiredPermission, scopeKey, allowedValues) => {
  return (req, res, next) => {
    const { user } = req;

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No user logged in' });
    }

    const userHasPermission = user.role[requiredPermission];
    const userScopeValue = user[scopeKey]; // e.g., user.region or user.department

    if (userHasPermission && allowedValues.includes(userScopeValue)) {
      next();
    } else {
      return res
        .status(403)
        .json({
          message: `Forbidden: You do not have access to this ${scopeKey}`,
        });
    }
  };
};

module.exports = checkDataScope;
