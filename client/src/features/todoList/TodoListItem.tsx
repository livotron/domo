interface TodoProps {
  completed: boolean,
  text: string,
  onClick: ()=> void
}

export default function TodoListItem({ completed, text, onClick }: TodoProps) {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >
      {text}
    </li>
  )
}