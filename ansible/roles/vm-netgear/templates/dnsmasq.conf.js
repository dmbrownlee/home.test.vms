interface=enp0s8
#bind-interfaces
domain=home.test
# DHCP range-leases
dhcp-range= enp0s8,192.168.42.2,192.168.42.2,255.255.255.0,1h
# PXE
dhcp-boot=pxelinux.0,pxeserver,192.168.42.1
# Gateway
dhcp-option=3,192.168.42.1
# DNS
dhcp-option=6,192.168.42.1, 8.8.8.8
server=8.8.4.4
# Broadcast Address
dhcp-option=28,192.168.42.255
# NTP Server
#dhcp-option=42,0.0.0.0
# Static IP address reservations
dhcp-host=50:e5:49:cb:c4:84,192.168.42.2
