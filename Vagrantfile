# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.ssh.private_key_path= "../keys/vagrant"
  config.ssh.pty = true
  # Common to all VMs
  config.vm.box = "CentOS-7-x86_64-Everything"
  config.vm.boot_timeout = 60
  config.vm.synced_folder ".", "/vagrant", disabled: false

  config.vm.provision :ansible do |ansible|
    ansible.playbook = "ansible/playbook.yml"
  end

  # VM to emulate NetGear router on home network
  config.vm.define "netgear" do |node|
    node.vm.box = "CentOS-7-x86_64-Minimal"
    node.vm.hostname = "netgear.home.test"
    node.vm.provider "virtualbox" do |vb|
      vb.name = "netgear"
      vb.memory = 1024
      vb.cpus = 1
      vb.gui = true
      vb.customize ["modifyvm", :id, "--nic1", "nat", "--cableconnected1", "on", "--nicpromisc1", "allow-vms"]
      vb.customize ["modifyvm", :id, "--nic2", "intnet", "--cableconnected2", "on", "--nicpromisc2", "allow-vms", "--intnet2", "home.test"]
      vb.customize ["modifyvm", :id, "--ostype", "RedHat_64"]
      vb.customize ["modifyvm", :id, "--vrde", "off"]
      # Detach the hdd created by Vagrant from the IDE controller
      vb.customize ["storageattach", :id, "--storagectl", "IDE Controller", "--port", 0, "--device", 0, "--medium", "none"]
      # Add a DVD drive to the IDE controller (do NOT insert disk)
      # and change boot order to boot from the ISO image.
      vb.customize ["storageattach", :id, "--storagectl", "IDE Controller", "--port", 0, "--device", 0, "--type", "dvddrive", "--medium", "emptydrive"]
      vb.customize ["modifyvm", :id, "--boot1", "dvd"]
      vb.customize ["modifyvm", :id, "--boot2", "disk"]
      # Add a SATA controller and reattach default disk to it
      unless (system( "vboxmanage showvminfo netgear 2>/dev/null |grep -q '^SATA Controller (0, 0):'" )) then
        vb.customize ["storagectl", :id, "--name", "SATA Controller", "--add", "sata"]
      end
      vb.customize ["storageattach", :id, "--storagectl", "SATA Controller", "--port", 0, "--device", 0, "--type", "hdd", "--medium", "/Users/dmb/VirtualBox VMs/netgear/CentOS-7-x86_64-Minimal-disk1.vmdk"]
    end
  end

  # VM for testing kickstart installs for the d1 host
  config.vm.define "d1.home.test" do |node|
    node.vm.box = "CentOS-7-x86_64-Minimal"
    node.vm.hostname = "d1.home.test"
    node.vm.provider "virtualbox" do |vb|
      vb.name = "d1.home.test"
      vb.memory = 8192
      vb.cpus = 2
      vb.gui = true
      vb.customize ["modifyvm", :id, "--ostype", "RedHat_64"]
      vb.customize ["modifyvm", :id, "--accelerate3d", "on"]
      vb.customize ["modifyvm", :id, "--vrde", "off"]
      vb.customize ["modifyvm", :id, "--vram", 16]
      vb.customize ["modifyvm", :id, "--nic1", "intnet", "--cableconnected1", "on", "--nicpromisc1", "allow-vms", "--intnet1", "home.test", "--macaddress1", "50e549cbc484"]
      vb.customize ["modifyvm", :id, "--nic2", "intnet", "--cableconnected2", "on", "--nicpromisc2", "allow-vms", "--intnet2", "nsm", "--macaddress1", "50e549cbc485"]
      # Detach the hdd created by Vagrant from the IDE controller
      vb.customize ["storageattach", :id, "--storagectl", "IDE Controller", "--port", 0, "--device", 0, "--medium", "none"]
      # Add a DVD drive to the IDE controller (do NOT insert disk)
      # and change boot order to boot from the ISO image.
      vb.customize ["storageattach", :id, "--storagectl", "IDE Controller", "--port", 0, "--device", 0, "--type", "dvddrive", "--medium", "emptydrive"]
      #vb.customize ["storageattach", :id, "--storagectl", "IDE Controller", "--port", 0, "--device", 0, "--type", "dvddrive", "--medium", "/Users/dmb/Downloads/CentOS-7-x86_64-Everything.iso"]
      vb.customize ["modifyvm", :id, "--boot1", "dvd"]
      vb.customize ["modifyvm", :id, "--boot2", "disk"]
      # Add a SATA controller and reattach default disk to it
      begin
        vb.customize ["storagectl", :id, "--name", "SATA Controller", "--add", "sata"]
        rescue   => e
        puts e
        puts e.message
      end
      vb.customize ["storageattach", :id, "--storagectl", "SATA Controller", "--port", 0, "--device", 0, "--type", "hdd", "--medium", "/Users/dmb/VirtualBox VMs/d1.home.test/CentOS-7-x86_64-Minimal-disk1.vmdk"]
      # Create and attach two more drives to mimic the drives in the
      # physical workstation
      vb.customize ["createmedium", "disk", "--filename", "/Users/dmb/VirtualBox VMs/d1.home.test/CentOS-7-x86_64-Minimal-disk2.vmdk", "--size", 40000, "--format", "VMDK"]
      vb.customize ["storageattach", :id, "--storagectl", "SATA Controller", "--port", 1, "--device", 0, "--type", "hdd", "--medium", "/Users/dmb/VirtualBox VMs/d1.home.test/CentOS-7-x86_64-Minimal-disk2.vmdk"]
      vb.customize ["createmedium", "disk", "--filename", "/Users/dmb/VirtualBox VMs/d1.home.test/CentOS-7-x86_64-Minimal-disk3.vmdk", "--size", 40000, "--format", "VMDK"]
      vb.customize ["storageattach", :id, "--storagectl", "SATA Controller", "--port", 2, "--device", 0, "--type", "hdd", "--medium", "/Users/dmb/VirtualBox VMs/d1.home.test/CentOS-7-x86_64-Minimal-disk3.vmdk"]
    end
  end

  # VM for testing kickstart installs for the d2 host
  config.vm.define "d2.home.test" do |node|
    node.vm.box = "CentOS-7-x86_64-Minimal"
    node.vm.hostname = "d2.home.test"
    node.vm.provider "virtualbox" do |vb|
      vb.name = "d2.home.test"
      vb.memory = 2048
      vb.cpus = 2
      vb.gui = true
      vb.customize ["modifyvm", :id, "--ostype", "RedHat_64"]
      vb.customize ["modifyvm", :id, "--nic1", "intnet", "--cableconnected1", "on", "--nicpromisc1", "allow-vms", "--intnet1", "home.test", "--macaddress1", "1c1b0d6bd9d6"]
      vb.customize ["modifyvm", :id, "--nic2", "intnet", "--cableconnected2", "on", "--nicpromisc2", "allow-vms", "--intnet2", "nsm", "--macaddress2", "1c1b0d6bd9d8"]
      # Detach the hdd created by Vagrant from the IDE controller
      vb.customize ["storageattach", :id, "--storagectl", "IDE Controller", "--port", 0, "--device", 0, "--medium", "none"]
      # Add a SATA controller and reattach default disk to it
      begin
        vb.customize ["storagectl", :id, "--name", "SATA Controller", "--add", "sata"]
        rescue   => e
        puts e
        puts e.message
      end
      vb.customize ["storageattach", :id, "--storagectl", "SATA Controller", "--port", 0, "--device", 0, "--type", "hdd", "--medium", "/Users/dmb/VirtualBox VMs/d2.home.test/CentOS-7-x86_64-Minimal-disk1.vmdk"]
    end
  end
end
