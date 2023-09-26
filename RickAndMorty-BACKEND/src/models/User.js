const DataTypes = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        "User",      //por default te crea el id como primary key y como entero.
        {
            id:{
                type: DataTypes.INTEGER,    //tambien se puede hacer con DataTypes.UUID Y en vez de autoIncrement usamos defaultValue:DataTypes.UUID
                allowNull: false,
                primaryKey:true,
                autoIncrement:true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps:false
        }

    )
}