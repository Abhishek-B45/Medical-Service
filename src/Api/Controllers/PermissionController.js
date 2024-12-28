const permissionService = require('../Services/PermissionService');

class PermissionController {
  async createPermissions(req, res) {
    try {
      const health_id = req.user.health_id;
      const newPermission = await permissionService.createPermission(health_id, req.body);
      res.status(201).json(newPermission);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllPermissions(req, res) {
    try {
      const health_id = req.user.health_id;
      const permissions = await permissionService.getAllPermissions(health_id);
      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPermissionById(req, res) {
    try {
      const health_id = req.user.health_id;
      const permission = await permissionService.getPermissionById(health_id, req.params.id);
      if (!permission)
        return res.status(404).json({ message: 'Permission not found' });
      res.status(200).json(permission);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePermission(req, res) {
    try {
      const health_id = req.user.health_id;
      const updatedPermission = await permissionService.updatePermission(health_id, req.params.id, req.body);
      if (updatedPermission[0] === 0)
        return res.status(404).json({ message: 'Permission not found' });
      res.status(200).json({ message: 'Permission updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deletePermission(req, res) {
    try {
      const health_id = req.user.health_id;
      const deleted = await permissionService.deletePermission(health_id, req.params.id);
      if (!deleted)
        return res.status(404).json({ message: 'Permission not found' });
      res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllPermissionsTree(req, res) {
    try {
      const { health_id } = req.query;
      const permissionTree = await permissionService.getAllPermissionsTree(health_id);
      res.status(200).json({ permissionTree });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching permission tree', error: error.message });
    }
  }

  async getUserPermissionTree(req, res) {
    try {
      const { health_id } = req.params;
      const permissionTree = await permissionService.getUserPermissionTree(health_id);
      res.status(200).json({ permissionTree });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user permission tree', error: error.message });
    }
  }
}

module.exports = new PermissionController();
