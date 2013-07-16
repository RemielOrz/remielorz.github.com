apt-get update
apt-get -y install xorg 

apt-get -y install vnc4server
vncserver
pkill -9 vnc
rm -rf /tmp/.X1*

apt-get -y install xfce4

apt-get -y install curl firefox

apt-get -y install  xfonts-intl-chinese xfonts-wqy ttf-wqy-zenhei ttf-wqy-microhei


http://remielorz.github.com/install_flash_player_11_linux.x86_64.tar.gz

tar zxvf install_flash_player_11_linux.x86_64.tar.gz
mkdir -p ~/.mozilla/plugins/
cp libflashplayer.so ~/.mozilla/plugins/

/etc/init.d/vncserver restart
cat >/root/.vnc/xstartup <<EOF
#!/bin/sh
/usr/bin/startxfce4 &
EOF
/etc/init.d/vncserver restart
chmod 777 ~/.vnc/xstartup

echo 'su -c "/usr/bin/vncserver"' >> /etc/init.d/vncserver
chmod 777 /etc/init.d/vncserver
update-rc.d vncserver defaults

echo 'su -c "/usr/bin/firefox"' >> /etc/init.d/firefox
chmod 777 /etc/init.d/firefox
update-rc.d firefox defaults 99


wget http://vagex.com/vagex_add_on-1.6.1.xpi


/etc/init.d/vncserver restart

crontab -e

