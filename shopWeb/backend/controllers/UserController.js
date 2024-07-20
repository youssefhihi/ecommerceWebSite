const User = require('../models/User');
class UserController {
    static async getusers(req,res) {
        const UserModel = new User();
        const result = await UserModel.getAll();
      if(result)
        {
            res.send(result);
        }
    } 

    static async AddUser(req, res) {
        try {
            const { name, email, phone, password } = req.body;
            const result = await User.AddUser(name, email, phone, password);          
            res.send(result);
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).send("Error adding user");
        }
    }

    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            if(id) {
                const UserModel = new User();
                const result = await UserModel.delete(id);
                res.send(result);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).send("Error deleting user");
        }
    }

    static async updateUser(req, res) {
        try {
            const id = req.params.id;
            const { name, email, phone, password } = req.body;
            if(id) {
                const result = await User.updateUser(id, name, email, phone, password);
                res.send(result);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).send("Error updating user");
        }
    }
    
}

module.exports = UserController;