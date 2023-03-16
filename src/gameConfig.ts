export type BlockId = '1' | '2' | '3' | '4' | '5'
const arrGameBlockType: BlockId[] = ['1', '2', '3', '4', '5']

export default {
    parentId: 'game',
    screenWidth: 1026,
    tileWidth: 171,
    tileHeight: 192,
    rows: 10, // Строк в игре
    colomns: 9, // Колон в игре
    arrGameBlockType: arrGameBlockType, // Типов в игре
    groupLengthToWin: 2, // Сжигаются не менее
    addBombLength: 4, // Когда добавляется бомба
    bombStartValue: 1, // Начальное количество бомб
    bombRadius: 2, // Сила бомбы
    stepsToWin: 20, // Доступно ходов
    pointsToWin: 100, // Нужно набрать очков
    shuffleCount: 5  // Перемешиваний до проигрыша
}