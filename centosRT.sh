yum install mod_dav_svn subversion

yum install gcc gcc-c++ m4 make automake libtool pkgconfig perl openssl-devel ncurses-devel mod_ssl openssl-devel apache2 php php-cli screen

cd /tmp
svn checkout http://xmlrpc-c.svn.sourceforge.net/svnroot/xmlrpc-c/stable xmlrpc-c
wget http://curl.haxx.se/download/curl-7.19.7.tar.gz
wget http://ftp.gnome.org/pub/GNOME/sources/libsigc++/2.2/libsigc++-2.2.4.tar.gz
wget http://libtorrent.rakshasa.no/downloads/libtorrent-0.12.6.tar.gz
wget http://libtorrent.rakshasa.no/downloads/rtorrent-0.8.6.tar.gz



tar -xvzf curl-7.19.7.tar.gz
tar -xvzf libsigc++-2.2.4.tar.gz
tar -xvzf libtorrent-0.12.6.tar.gz
tar -xvzf rtorrent-0.8.6.tar.gz



cd curl-7.19.7
./configure
make
make install
cd ..


cd libsigc++-2.2.4
./configure
make
make install
cd ..


export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig
cd libtorrent-0.12.6
rm -f scripts/{libtool,lt*}.m4
./autogen.sh
./configure
make
make install
cd ..


cd xmlrpc-c
./configure
make
make install
cd ..


cd rtorrent-0.8.6
rm -f scripts/{libtool,lt*}.m4
./autogen.sh
./configure --with-xmlrpc-c=/usr/local/bin/xmlrpc-c-config
make
make install
cd ~


wget http://libtorrent.rakshasa.no/export/1105/trunk/rtorrent/doc/rtorrent.rc
mv rtorrent.rc .rtorrent.rc