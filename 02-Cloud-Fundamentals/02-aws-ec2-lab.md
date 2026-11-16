---
title: "Hands-on Lab: Launch a Linux VM on AWS EC2"
---

# Hands-on Lab: Launch a Linux VM on AWS EC2

**Estimated time:** 45–60 minutes | **Level:** Beginner | **Platform:** AWS Console

Goal: launch a small Linux EC2 instance, connect to it, inspect it and terminate it.

## Before you start

- An AWS account you are authorized to use, with MFA enabled.
- A laptop with a browser and SSH client.
- Permission to create EC2 resources in the selected Region.

If you do not have an approved AWS account, use the instructor's sandbox or watch the demonstration. Never use another person's identity or payment method.

## Cost and safety

EC2, EBS volumes, public IPv4 addresses, data transfer and related resources may incur charges. Pricing and Free Tier eligibility vary by account, Region, date and usage.

1. Review [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/).
2. Use the smallest suitable instance type permitted for the lab.
3. Use an instructor-approved Region.
4. Do not create NAT Gateways, load balancers or other paid services for this exercise.
5. Never share AWS credentials or private key files.
6. A budget or billing alert is not a hard spending cap.

## Part A — Open EC2

1. Sign in to the AWS Management Console.
2. Confirm the account and Region shown in the console.
3. Open EC2, select Instances and choose Launch instances.

## Part B — Configure the instance

Use this learning configuration. Exact options and availability vary by Region and account.

| Setting | Lab choice |
| --- | --- |
| Name | week3-linux-lab |
| AMI | A current Amazon Linux image approved by the instructor |
| Instance type | Smallest suitable eligible type, such as t3.micro where available |
| Key pair | Create a new key pair and download it securely |
| Network | Default VPC is acceptable for this introductory exercise |
| Public IP | Enable only if you need direct SSH from your network |
| Storage | Keep the default small root volume |
| Tags | Course=DevOpsBootcamp, Week=3, Owner=YourName |

### Security group

- Allow SSH (TCP 22) inbound only from My IP.
- No inbound HTTP or HTTPS rule is required for this exercise.
- Never allow SSH from 0.0.0.0/0 for this lab.

If your public IP changes, update the rule to your current IP rather than opening SSH to everyone. Review the configuration and launch the instance.

## Part C — Connect

Wait until the instance is running and status checks have passed.

**Option 1 — EC2 Instance Connect:** if supported and enabled for your AMI, instance and network, select the instance and choose Connect → EC2 Instance Connect.

**Option 2 — SSH:** use the public IPv4 address or DNS name shown for your instance. The default username for Amazon Linux images is commonly ec2-user.

On macOS/Linux, restrict private key permissions:

    chmod 400 week3-lab-key.pem

Connect:

    ssh -i week3-lab-key.pem ec2-user@YOUR_PUBLIC_IP

Replace YOUR_PUBLIC_IP with the instance's actual address. Never paste your private key into chat, GitHub or screenshots.

If SSH fails, check instance state and status checks, public IP, AMI username, security-group source, local firewall and whether the key matches the instance.

## Part D — Inspect the Linux VM

After connecting, run:

    whoami
    hostname
    uname -a
    cat /etc/os-release
    uptime
    free -h
    df -h
    ip addr

Answer:

1. Which user are you connected as?
2. Which Linux distribution and version is running?
3. How many CPUs are visible?
4. How much memory is available?
5. What filesystem is mounted as the root filesystem?
6. What private IP address does the instance have?

Optional package update check, if approved:

    sudo dnf check-update

A package update check may return a non-zero status when updates are available; that is not necessarily a failure.

## Part E — Identify cloud resources

In the EC2 console, identify the instance ID, instance type, AMI, Availability Zone, VPC ID, subnet ID, private IPv4 address, public IPv4 address (if assigned), security group and attached EBS root volume.

Do not publish account IDs, sensitive private addresses, active public IPs or other details your organization considers sensitive.

## Part F — Cleanup (required)

1. Return to EC2 → Instances.
2. Select week3-linux-lab.
3. Choose Instance state → Terminate instance.
4. Confirm termination.
5. Check EBS → Volumes and ensure the lab root volume was deleted if configured for deletion on termination.
6. Check Elastic IPs and release any address you allocated for this lab.
7. Remove unused lab security groups and key pairs only when sure they are not used elsewhere.
8. Review the billing console later for unexpected resources or charges.

**Stop is not the same as terminate.** A stopped instance may still have billable attached storage and other resources. Termination is the intended cleanup action for this disposable lab.

## Evidence to submit

- Instance configuration while it exists (hide sensitive identifiers).
- Successful connection or terminal output from Part D.
- Security-group SSH rule restricted to your IP (hide sensitive details).
- Terminated instance state.

Never submit private keys, passwords, access keys, session tokens or credentials.

## Troubleshooting

| Symptom | Checks |
| --- | --- |
| SSH timeout | Public IP, route, security-group source, network ACL and local firewall |
| Permission denied (publickey) | Correct key file, username and matching key pair |
| Instance will not start | Instance limits, capacity, permissions and launch errors |
| Cannot use Instance Connect | AMI support, IAM permissions, network path and endpoint requirements |
| Unexpected charges | EBS volumes, public IPv4, snapshots, Elastic IPs and other services |

## Success criteria

- [ ] Instance launched in the intended Region.
- [ ] SSH access restricted to your IP or approved connection method used.
- [ ] Linux system information collected.
- [ ] Cloud networking and instance metadata identified.
- [ ] Instance terminated.
- [ ] Remaining billable resources checked.
- [ ] Evidence saved without secrets.
