import { useState } from "react"

const Carousel = props => {
    const {children} = props

    const [currentImage, setCurrentImage] = useState(0)

    const previus = () => {
        setCurrentImage(currentImage === 0 ? -children.length + 1 : currentImage + 1)
    }
    const next = () => {
        setCurrentImage(currentImage === -children.length + 1 ? 0 : currentImage - 1)
    }
  return (
    <div className="overflow-hidden relative ">
        <div className={`flex w-full gap-20 ps-3 transition-transform ease-out duration-500 translate-x-[${currentImage * 100}%]`}>{children}</div>
        <div className="absolute inset-0 flex items-center justify-between p-2">
            <button onClick={() => {previus()}} className="px-2 py-1 border-[1px] border-neutral-600 rounded-pill bg-white text-neutral-700"><i className="bi bi-caret-left text-3xl"></i></button>
            <button onClick={() => {next()}} className="px-2 py-1 border-[1px] border-neutral-600 rounded-pill bg-white text-neutral-700"><i className="bi bi-caret-right text-3xl"></i></button>
        </div>
        <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
                {children.map((_,i) => (
                    <div key={i} className={`transition-all w-3 h-3 border-[1px] border-neutral-900 ${currentImage === i - (i*2) ? 'p-2 bg-indigo-600' : 'bg-white'} rounded-pill`}></div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Carousel