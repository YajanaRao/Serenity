import React from 'react';
import AlertCircleOutlineIcon from '../assets/Icons/alert-circle-outline.svg';
import ArrowBackIcon from '../assets/Icons/arrow-back.svg';
import ArrowBackOutlineIcon from '../assets/Icons/arrow-back-outline.svg';
import BarChartOutlineIcon from '../assets/Icons/bar-chart-outline.svg';
import CheckmarkIcon from '../assets/Icons/checkmark.svg';
import CloseOutlineIcon from '../assets/Icons/close-outline.svg';
import CloseIcon from '../assets/Icons/close.svg';
import BrowserOutlineIcon from '../assets/Icons/browser-outline.svg';
import BrowserIcon from '../assets/Icons/browser.svg';
import DownloadOutlineIcon from '../assets/Icons/download-outline.svg';
import EditOutlineIcon from '../assets/Icons/edit-outline.svg';
import FolderIcon from '../assets/Icons/folder.svg';
import FolderAddOutlineIcon from '../assets/Icons/folder-add-outline.svg';
import FolderOutlineIcon from '../assets/Icons/folder-outline.svg';
import HeartOutlineIcon from '../assets/Icons/heart-outline.svg';
import HeartIcon from '../assets/Icons/heart.svg';
import HomeOutlineIcon from '../assets/Icons/home-outline.svg';
import HomeIcon from '../assets/Icons/home.svg';
import LogOutOutlineIcon from '../assets/Icons/log-out-outline.svg';
import MenuOutlineIcon from '../assets/Icons/menu-outline.svg';
import MoreVerticalOutlineIcon from '../assets/Icons/more-vertical-outline.svg';
import MusicOutlineIcon from '../assets/Icons/music-outline.svg';
import PauseIcon from '../assets/Icons/pause.svg';
import PlayCircleOutlineIcon from '../assets/Icons/play-circle-outline.svg';
import PlayIcon from '../assets/Icons/play.svg';
import PlaylistPlayIcon from '../assets/Icons/playlist-play.svg';
import PlaylistPlusIcon from '../assets/Icons/playlist-plus.svg';
import PlusIcon from '../assets/Icons/plus.svg';
import RadioOutlineIcon from '../assets/Icons/radio-outline.svg';
import RefreshOutlineIcon from '../assets/Icons/refresh-outline.svg';
import RepeatOffIcon from '../assets/Icons/repeat-off.svg';
import RepeatOnceIcon from '../assets/Icons/repeat-once.svg';
import RepeatIcon from '../assets/Icons/repeat.svg';
import SaveOutlineIcon from '../assets/Icons/save-outline.svg';
import SaveIcon from '../assets/Icons/save.svg';
import SearchOutlineIcon from '../assets/Icons/search-outline.svg';
import SearchIcon from '../assets/Icons/search.svg';
import SettingsOutlineIcon from '../assets/Icons/settings-outline.svg';
import ShuffleOutlineIcon from '../assets/Icons/shuffle-outline.svg';
import SkipBackOutlineIcon from '../assets/Icons/skip-back-outline.svg';
import SkipForwardOutlineIcon from '../assets/Icons/skip-forward-outline.svg';
import TrashOutlineIcon from '../assets/Icons/trash-outline.svg';
import TrendingUpOutlineIcon from '../assets/Icons/trending-up-outline.svg';
import WifiOffOutlineIcon from '../assets/Icons/wifi-off-outline.svg';
import ArrowForwardIcon from '../assets/Icons/arrow-forward.svg';
import DoneAllIcon from '../assets/Icons/done-all.svg';
import UnlockOutlineIcon from '../assets/Icons/unlock-outline.svg';
import LogInOutlineIcon from '../assets/Icons/log-in-outline.svg';
import PersonOutlineIcon from '../assets/Icons/person-outline.svg';
import { log } from '../../../mobile/src/utils/logging';

const ICONS = {
  'arrow-back': ArrowBackIcon,
  'skip-back-outline': SkipBackOutlineIcon,
  'skip-forward-outline': SkipForwardOutlineIcon,
  'home-outline': HomeOutlineIcon,
  home: HomeIcon,
  search: SearchIcon,
  'search-outline': SearchOutlineIcon,
  browser: BrowserIcon,
  'browser-outline': BrowserOutlineIcon,
  'settings-outline': SettingsOutlineIcon,
  'close-outline': CloseOutlineIcon,
  save: SaveIcon,
  'save-outline': SaveOutlineIcon,
  'radio-outline': RadioOutlineIcon,
  'trending-up-outline': TrendingUpOutlineIcon,
  'heart-outline': HeartOutlineIcon,
  'bar-chart-outline': BarChartOutlineIcon,
  'log-out-outline': LogOutOutlineIcon,
  'trash-outline': TrashOutlineIcon,
  'alert-circle-outline': AlertCircleOutlineIcon,
  play: PlayIcon,
  pause: PauseIcon,
  plus: PlusIcon,
  checkmark: CheckmarkIcon,
  close: CloseIcon,
  'more-vertical-outline': MoreVerticalOutlineIcon,
  'menu-outline': MenuOutlineIcon,
  folder: FolderIcon,
  'folder-outline': FolderOutlineIcon,
  'folder-add-outline': FolderAddOutlineIcon,
  heart: HeartIcon,
  'repeat-once': RepeatOnceIcon,
  repeat: RepeatIcon,
  'repeat-off': RepeatOffIcon,
  'refresh-outline': RefreshOutlineIcon,
  'play-circle-outline': PlayCircleOutlineIcon,
  'shuffle-outline': ShuffleOutlineIcon,
  'music-outline': MusicOutlineIcon,
  'arrow-back-outline': ArrowBackOutlineIcon,
  'wifi-off-outline': WifiOffOutlineIcon,
  'playlist-play': PlaylistPlayIcon,
  'playlist-plus': PlaylistPlusIcon,
  'edit-outline': EditOutlineIcon,
  'download-outline': DownloadOutlineIcon,
  'arrow-forward': ArrowForwardIcon,
  'done-all': DoneAllIcon,
  'unlock-outline': UnlockOutlineIcon,
  'log-in-outline': LogInOutlineIcon,
  'person-outline': PersonOutlineIcon,
};

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  direction?: 'rtl' | 'ltr';
  allowFontScaling?: boolean | undefined;
}

export const Icon = ({ name, size = 40, color = '#000000', ...props }: IconProps) => {
  const IconImpl = ICONS[name];
  if (!IconImpl) log.error('missing icon', name);
  return IconImpl ? (
    <IconImpl width={size} height={size} color={color} {...props} />
  ) : null;
};
