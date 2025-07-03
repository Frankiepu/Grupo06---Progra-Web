module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'users',
        timestamps: false
    });

    return user;
}