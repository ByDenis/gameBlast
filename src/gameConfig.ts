export type BlockId = '1' | '2' | '3' | '4' | '5'
const arrGameBlockType: BlockId[] = ['1', '2', '3', '4', '5']

export default {
    parentId: 'game',
    screenWidth: 1080,
    tileWidth: 171,
    tileHeight: 192,
    rows: 8, // Строк в игре
    colomns: 12, // Колон в игре
    arrGameBlockType: arrGameBlockType, // Типов в игре
    groupLengthToWin: 2, // Сжигаются не менее
    addBombLength: 5, // Когда добавляется бомба
    bombStartValue: 1, // Начальное количество бомб
    bombRadius: 2, // Сила бомбы
    stepsToWin: 20, // Доступно ходов
    pointsToWin: 100, // Нужно набрать очков
    shuffleCount: 5  // Перемешиваний до проигрыша
}