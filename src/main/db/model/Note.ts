export default (sequelize, DataTypes) => {
    const NoteModel = sequelize.define("Note", {
      id: {
        unique: true,
        primaryKey: true,
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      }
    });
    return NoteModel;
}