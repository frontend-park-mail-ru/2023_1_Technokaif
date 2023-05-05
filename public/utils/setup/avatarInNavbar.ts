import { DropDownSetup } from '@smallComponents/dropDown/dropDown';
import { AvatarSetup } from '@smallComponents/navbarAvatar/avatarNavbar';

export const navbarAvatarSetup:AvatarSetup = {
    mainDiv: 'navbar-avatar',
    imgDiv: 'navbar-avatar__img-container',
    imgSrc: '',
    imgClass: 'dropdown-sub-title navbar-avatar__img',
    textDiv: 'navbar-avatar__text-container',
    textClass: 'dropdown-sub-title navbar-avatar__text',
    text: '',
};

export const dropDownAvatarSetup:DropDownSetup = {
    mainDropDownDiv: 'dropDown',
    dropdownName: 'navbar-dropDown__name',
    dropdownTitleDiv: 'dropDown__title',
    dropdownOptionsDiv: 'dropDown__options',
};
