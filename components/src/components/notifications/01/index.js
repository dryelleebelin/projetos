import React, { useRef, useEffect } from "react";
import './notifications01.scss';

import { TbMessage } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoPersonCircle } from "react-icons/io5";

export default function Notifications01() {
  const notificationsRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const notifications = notificationsRef.current;
    const dropdown = dropdownRef.current;

    const handleClickOutside = (event) => {
      if (dropdown && !dropdown.contains(event.target) && notifications && !notifications.contains(event.target)) {
        dropdown.classList.add('hide');
        dropdown.classList.add('dropdown_wrapper--fade-in');
      }
    };

    const handleNotificationsClick = () => {
      if (dropdown) {
        dropdown.classList.remove('none');
        dropdown.classList.toggle('hide');
      }
    };

    document.addEventListener('click', handleClickOutside);
    notifications.addEventListener('click', handleNotificationsClick);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      notifications.removeEventListener('click', handleNotificationsClick);
    };
  }, []);

  return (
    <header className="header">
      <div className="navigation_group">
        <button className="icon-wrapper">
          <TbMessage className="icon"/>
        </button>
        <div ref={notificationsRef} className="icon-wrapper notifications">
          <button type="button">
            <MdNotificationsNone className="icon"/>
          </button>
          <div className="notification-mark notification-mark--pulsing"></div>
        </div>
        <button className="profile" type="button">
          <CgProfile/>
        </button>
      </div>

      <div ref={dropdownRef} className="dropdown_wrapper hide dropdown_wrapper--fade-in none">
        <div className="notifications-top">
          <h2>Notifications</h2>
        </div>
        <div className="notification-items">
          <div className="notification-item notification-item--recent">
            <div className="avatar-wrapper">
              <IoPersonCircle className="avatar"/>
            </div>
            <div className="notification-item_body">
              <div>
                <strong>Jason Alexander</strong> completed
                <strong> Issue 131</strong>
              </div>
              <span className="time">6 min ago</span>
            </div>
            <div className="border"></div>
          </div>
          <div className="notification-item notification-item--recent">
            <div className="avatar-wrapper">
              <IoPersonCircle className="avatar"/>
            </div>
            <div className="notification-item_body">
              <div>
                <strong>Michelle Claude</strong> opened a new
                <strong> Issue 152</strong>
              </div>
              <span className="time">8 min ago</span>
            </div>
            <div className="border"></div>
          </div>
          <div className="notification-item notification-item--recent">
            <div className="avatar-wrapper">
              <IoPersonCircle className="avatar"/>
            </div>
            <div className="notification-item_body">
              <div>
                <strong>Jennifer Floyd</strong> created
                <strong> Road Map 2023</strong>
              </div>
              <span className="time">1 week</span>
            </div>
            <div className="border"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
