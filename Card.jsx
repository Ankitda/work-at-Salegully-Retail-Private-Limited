import { useState } from 'react';
import { FiThumbsUp } from "react-icons/fi";  // installed the dependencies of react-icon
import { LuThumbsDown } from "react-icons/lu";
import { ImShare } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";

const Card = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className='w-full relative'>
                <img className="w-full" src={""} alt="Card Image" />
                <div className="absolute inset-0 bg-transparent opacity-0 hover:opacity-50 grid content-between p-3">
                    <div className='ml-auto flex flex-row space-x-3 m'>
                        <p className='bg-black opacity-50 z-50 rounded-md w-14 text-white cursor-pointer flex items-center justify-center p-1'><ImShare /></p>
                        <p className='bg-black opacity-50 z-50 rounded-md w-14 text-white cursor-pointer flex items-center justify-center p-1'><MdEdit /></p>
                        <p className='bg-black opacity-50 z-50 rounded-md w-14 text-white cursor-pointer flex items-center justify-center p-1'><IoReorderThreeOutline /></p>
                    </div>
                    <p className='text-zinc-950 w-36 rounded-full mb-2 ml-1 bg-white opacity-100 text-center cursor-pointer z-50 font-medium'>from your idea</p>
                </div>
            </div>
            <div className="p-4 w-full">
                <h2 className="text-xl font-semibold text-gray-800">Card Title</h2>
                <div className={`text-gray-600 mt-2 box-border transition-all duration-500 ${isExpanded ? 'h-96 overflow-auto' : 'h-7 overflow-hidden'}`}>
                    <p className=''>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores laudantium cum dolorum sed, optio doloribus dolores ea perferendis amet deleniti maxime odio rem qui provident dolor eaque nam, nihil quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, autem ipsa corporis eos in earum accusantium, similique, temporibus eaque totam harum blanditiis? Ut consequuntur tenetur harum neque adipisci debitis ducimus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab officia cupiditate facere ex voluptas! Reprehenderit esse dolor officia, quisquam nobis, eveniet repellendus dignissimos iste tenetur architecto quaerat doloremque quis? Iusto. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id sed vitae possimus corrupti voluptates harum quasi vel mollitia quis aspernatur molestiae, obcaecati qui, beatae nisi a nihil accusantium officia ad? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde fugit nihil voluptatem iusto at nesciunt sit impedit officiis illum, sequi numquam eaque aliquid eveniet voluptate odit amet atque quidem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis ullam qui esse sed aut dolorem, quam fuga quis aperiam laudantium tenetur unde? Quia dolorum maiores reiciendis tempore illum beatae facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore iste officiis sapiente omnis architecto perspiciatis aut recusandae ullam illum at sint dicta corporis, magni eaque itaque libero cupiditate dignissimos corrupti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque molestiae deserunt atque, et sint impedit rerum sit iste, aut fugit distinctio est obcaecati beatae accusamus dolore aliquid veniam! Ea, quod!
                    </p>
                </div>
                <div className='bg-white w-full p-3 flex flex-row justify-end'>
                    <p onClick={toggleHeight} className='text-blue-500 font-serif font-medium cursor-pointer'>{isExpanded ? 'show less' : 'show more'}</p>
                </div>
                <div className='flex flex-row justify-between p-2'>
                    <p className='text-slate-400'>3 days ago</p>
                    <p className='text-slate-400 flex justify-between space-x-3 cursor-pointer'>
                        <span className='text-lg'> <FiThumbsUp />  </span>
                        <span className='text-lg'> <LuThumbsDown /> </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;