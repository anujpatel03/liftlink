import Image from "next/image"
import avatar from "../images/avatar.jpeg"
import { IoPerson } from "react-icons/io5";


const style = {
    wrapper: `w-full h-16 flex items-center md:justify-around bg-black text-white`,
    leftMenu: `flex gap-3`,
    logo: `text-3xl text-white flex cursor-pointer mr-16`,
    menuItem: `text-lg text-white flex cursor-pointer font-medium items-center mx-4`,
    rightMenu: `flex gap-3 items-center`,
    userImageContainer: `rounded-full overflow-hidden mr-2`,
    userImage: `rounded-full h-10 w-10 mr-4 p-px object-cover cursor-pointer`,
    loginButton: `bg-white text-black rounded-full px-4 py-2 font-medium cursor-pointer hover:bg-gray-100 transition duration-300 flex align-center items-center`,
    loginText: `text-black font-medium ml-2`,
}

// const currentAccount = "0x22947Fd32D915De273a17f22463bAc5e99aDDE63"
const currentAccount = ""

const Navbar = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.leftMenu}>
                <div className={style.logo}>LiftLink</div>
                <div className={style.menuItem}>Ride</div>
                <div className={style.menuItem}>Drive</div>
                <div className={style.menuItem}>More</div>
            </div>
            <div className={style.rightMenu}>
                <div className={style.menuItem}>Help</div>
                <div className={style.menuItem}>Anuj</div>
                <div className={style.userImageContainer}>
                    <Image className={style.userImage} src={avatar} alt="avatar" width={40} height={40} />
                </div>
                {
                    currentAccount ? (
                        <div >
                            {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
                        </div>
                    ) : (

                        <div className={style.loginButton}>
                            <IoPerson />
                           <span className={style.loginText}> Login</span> 
                        </div>
                    )

                }
            </div>
        </div>
    )
}

export default Navbar