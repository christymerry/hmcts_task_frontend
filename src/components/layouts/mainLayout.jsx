import Header from "../header/header"

const MainLayout = ({children, title}) => {
  return (
    <div className="max-w-[1024px] m-auto p-5">
        <Header />
        <p className="text-slate-500 my-3 text-sm">{title}</p>
        {children}
    </div>
  )
}

export default MainLayout
