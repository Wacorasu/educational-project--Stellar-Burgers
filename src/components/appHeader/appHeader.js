import appHeader from './appHeader.module.css';
import React from 'react';
import { Logo, ProfileIcon, BurgerIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';


export default function AppHeader (){
    return(
        <header className={`${appHeader.header} mb-5`}>
            <nav className={appHeader.navigation}>
                <ul className={`${appHeader.menuList} pt-4 pb-4`}>
                    <li>
                        <ul className={appHeader.menuListLeft}>
                            <li><a className={`${appHeader.link} pt-4 pb-4 pl-5 pr-5 mr-2`} href='#'><BurgerIcon type="primary"/><p className='text text_type_main-default ml-2'>Конструктор</p></a></li>
                            <li><a className={`${appHeader.link} pt-4 pb-4 pl-5 pr-5`} href='#'><ListIcon type="secondary" /><p className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</p></a></li>
                        </ul>
                    </li>
                    <li className={appHeader.logo}><Logo /></li>
                    <li><a className={`${appHeader.link} pt-4 pb-4 pl-5 pr-5`} href='#'><ProfileIcon type="secondary" /><p className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</p></a></li>
                </ul>  
            </nav>
        </header>
    );
}
