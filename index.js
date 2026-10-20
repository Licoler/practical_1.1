
const sequelize = require('./database');
const Car = require('./models/Car');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно.');

    await sequelize.sync();
    console.log('Таблица автомобилей создана.');

    if (await Car.count() === 0) {
      await Car.bulkCreate([
        {
          brand: 'Toyota',
          model: 'Camry',
          year: 2022,
          price: 3500000,
          isAvailable: true,
        },
        {
          brand: 'BMW',
          model: 'X5',
          year: 2023,
          price: 8500000,
          isAvailable: false,
        },
      ]);
    }

    const cars = await Car.findAll();

    console.log('\nСписок автомобилей:');
    console.table(cars.map(car => car.toJSON()));
  } catch (error) {
    console.error('Ошибка:', error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
    console.log('Соединение с базой данных закрыто.');
  }
}

main();
