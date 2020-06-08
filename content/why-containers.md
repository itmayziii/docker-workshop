---
title: "Why Use Containers"
metaTitle: "Why Use Containers"
metaDescription: "Containers, docker especially, are the hot technology right now but what makes them so popular and why should we use them"
---

# The Problem Containers Solve

## 1. Dev/Prod Parity
[Dev/Prod Parity](https://12factor.net/dev-prod-parity)

Containers allow developers to run code on the same infrastructure that our production environments use. This is because
application infrastructure is paired with the application code itself.

**i.e.** If your website has redirects that you are managing with [Nginx](https://www.nginx.com/), then the edits to the
Nginx configuration will be made locally. If the change works locally you have a guarantee that it will also work in
production. This is opposed to running Nginx on your local machine where you would make a change locally and then have
to tell some systems engineer to make the same change in an elevated environment. Even if the person that makes the
change locally and in the elevated environment are the same person there would be _NO_ guarantee that the Nginx running
locally and in production will be configured the same.

It is nice to think of a container similar to a JVM where you have a guarantee your Java code will run the same on
Windows, Linux, and MacOS.

## 2. Scalability
Containers are extremely lightweight compared to VMs. This is because containers share the host operating system while VMs
have their own operating system. This often means that you can run hundreds of containers on a modestly sized computer
without noticing much of a performance impact. Obviously this leads to faster startup times to get new containers up and
running as well as reduced server costs as you can run more applications running on 1 server.

## 3. Easy to Upgrade
If you are managing infrastructure manually today either by SSHing into servers or using some provisioning tool like
[ansible](https://www.ansible.com/) or [puppet](https://puppet.com/) then you have probably experienced some headaches
of deployments not working the same way on every server. Sometimes these tools will leave your application in a half
configured upgrade if something fails unexpectedly like the network connection. It can take a lot of work to make your
deployment scripts resilient to change by having rollback actions setup and staging your changes correctly before actually
committing them.

With containers all the issues you have with staging changes and rolling back every action just do not exist. Often an
upgrade with a tool like Docker will be changing the [Dockerfile](https://docs.docker.com/engine/reference/builder/)
from nginx:1.16.0 to nginx:1.18.0. If for some reason the deployment fails then your rollback strategy is often simply
changing the version numbers back. This is made possible because containers, more specifically images, are immutable.
When you deploy you are not modifying existing infrastructure but instead provisioning new infrastructure and then removing
the old from the network.

# Containers vs VMs
Containers are isolated, lightweight processes that take advantages of the host operation system's kernel. VMs run a
standalone operating system which includes its own kernel.

We are not going to focus on the lower level differences between these two technologies. I would suggest reading some
[offical docs](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/containers-vs-vm) on the topic. It
is just important for you to know that these two technologies are not exclusive. It is very common to be using these technologies
together especially in elevated environments. Take a look at [Kubernetes](https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-intro/)
for instance where the "nodes" are essentially VMs and the "pods" are usually containers running on top of the nodes.

# Immutability

