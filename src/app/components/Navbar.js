"use client"
import { useContext } from "react";
import { LiftContext } from "../../../context/liftContext";
import Image from "next/image"
import avatar from "../images/avatar.jpeg"
import { IoPerson } from "react-icons/io5";


const style = {
    wrapper: `h-16 w-full bg-black text-white flex md:justify-around items-center px-60 fixed z-20`,
    leftMenu: `flex gap-3`,
    logo: `text-3xl text-white flex cursor-pointer mr-16`,
    menuItem: `text-lg text-white font-medium flex items-center mx-4 cursor-pointer`,
    rightMenu: `flex gap-3 items-center`,
    userImageContainer: `mr-2`,
    userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
    loginButton: `flex items-center cursor-pointer rounded-full px-4 py-1 h-10 bg-white text-black`,
    loginText: `text-black font-medium ml-2`,
}

// const currentAccount = "0x22947Fd32D915De273a17f22463bAc5e99aDDE63"
// const showMessage = () => {
//     alert("Install Meta Mask browser extension and connect it with liftlink !");
// }
const Navbar = () => {
    const {currentAccount, connectWallet, currentUser} = useContext(LiftContext);
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
                <div className={style.menuItem}>{currentUser.name}</div>
                <div className={style.userImageContainer}>
                    <Image className={style.userImage} src={avatar} alt="avatar" width={40} height={40} />
                </div>
                {
                    currentAccount ? (
                        <div >
                            {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
                        </div>
                    ) : (

                        <div className={style.loginButton}  onClick={()=> connectWallet()}>
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