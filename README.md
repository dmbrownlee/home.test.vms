The home.test.vms repository uses Vagrant to create a virtual environment in
VirtualBox which mimics the machines on my home network.  This project only
creates the VMs and does the provisioning of the fake netgear VM.  The host
VMs should be provisioned just like the actual hosts using the configs in
the home.test repository.

If you are reading this on github, you can get started on your own Mac
as follows:

$ mkdir ~/projects && cd ~/projects
$ git clone git@github.com:dmbrownlee/home.test.vms.git
$ cd home.test.vms && ./setup

That downloads and installs the necessary software.  Next, we create the VM
to emulate the functions of the home router (Wireless AP/router providing a
gateway to the Internet as well as DHCP/DNS services for the network)

$ vagrant up netgear
$ vagrant reload netgear

Now create the first server on the network.

$ vagrant up --no-provision d1.home.test

This will create the VM but the provisioning process will fail to connect via
ssh because all the network interfaces are internal only.  This is expected.

After the virtual hardware has been created, shutdown the VM, "insert" the
CentOS 7 NetInstall ISO image in the VM settings and follow these steps:

1. Boot start the VM
2. At the installation menu, press [tab] to append to the kernel boot line
3. Add "inst.ks=https://raw.githubusercontent.com/dmbrownlee/home.test/master/d1-ks.cfg" and press [enter].
