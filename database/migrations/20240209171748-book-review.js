// migrations/20240204123000-create-purchase-history.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('book_reviews', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      bookId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'book_id',
        references: {
          model: 'books',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'author_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'deleted_at',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('book_reviews');
  },
};
