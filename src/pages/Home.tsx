import RandomizerType from "../components/RandomizerType";

const typesList = [
  {
    index: 0,
    link: 'numbers',
    title: 'Рандомайзер чисел',
    description: 'Генерирует случайное число в заданном диапазоне. Генирация нескольких чисел, без повторов числа или с повтором.',
  },
  {
    index: 1,
    link: 'list',
    title: 'Рандомайзер по списку',
    description: 'Получение победителя из заданного вами списка. Получение сразу нескольких результатов, без повторов. Выбор представления для получения результата',
  },
  {
    index: 2,
    link: 'list',
    title: 'Рандомайзер по списку',
    description: 'Получение победителя из заданного вами списка. Получение сразу нескольких результатов, без повторов. Выбор представления для получения результата',
  },

];

function App() {

  return (
    <div className="types-list">
      <div className="grid-3">
        {typesList.map((item) => (
          <RandomizerType link={item.link} title={item.title} description={item.description}/>
        ))}
      </div>
    </div>
  )
}

export default App
