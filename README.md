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

That downloads the necessary software.  Now you can create the VMs with:

$ vagrant up netgear
$ vagrant up --no-provision d1.home.test

After the virtual hardware has been created, shutdown the VM, "insert" the
ISO image, and install as you would on the physical machine.  See the
README.md in the home.test repository for more details.
