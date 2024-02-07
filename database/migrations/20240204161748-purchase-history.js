// migrations/20240204123000-create-purchase-history.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('purchase_histories', {
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
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'purchase_date',
      },
      bookPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'book_price',
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'total_price',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('purchase_histories');
  },
};
