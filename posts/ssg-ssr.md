6 PM
👏
👍
👎
😊
😞

Minecraft on Kubernetes
Hey Robert!

Joyce forwarded your contact info after you reached out via Medium, and I wanted to touch base because your project sounded super interesting to us!

My cofounder and I run a small startup specializing in deploying huge numbers of apps to large clusters using Kubernetes, so the idea of running 350 Minecraft servers naturally caught my attention! And of course I've sunk far too many hours into playing it back in my gaming days :-P

We just got finished setting up one of our customers, Beeper Chat, who was in a similar situation. When one of their customers signs up, we provision them their own database and a handful of small app servers to bridge their chat networks.

Would you be down to have a brief chat about what you're building? We're currently pivoting our business model a bit and at the very least would love your feedback!

Cheers,
Dan
Robert Cringely sent the following messages at 11:36 PM
View Robert’s profileRobert Cringely
Robert Cringely 11:36 PM
Sure, Dan. Here is the sad story of what we've done so far. My three kids and I decided we were going to make and sell $99 Minecraft servers. So we did a KickStarter campaign, raised $34,000, and started building the 350 servers we had promised to our backers. Then the developer who was helping us DISAPPEARED, the next developer DISAPPEARED WITH SOME MONEY, and the third developer DIED.

It gets worse...

Then I went blind, our house burned down in the Tubbs fire along with half of our town (so no sympathy, even), we were homeless for a year, I got my sight surgically restored, our KickStarter backers hate us, but how do we replace those 350 melted SBCs?

Actually, we don't want to replace them because it was just too darned hard to deal with all the UPNP, NAT Traversal and other problems. We were working with ZeroTier and came up with a great solution, but ultimately the backend costs would have been too much given our hardware costs. And that's when we decided to go to the cloud with Kubernetes. Since this is getting long I'll put our intended solution in the next message.

Bob
TODAY
View Robert’s profileRobert Cringely
Robert Cringely 12:07 AM
We still want to have something called a $99 Mineserver and a $199 Mineserver Pro, but it won't actually be a computer. It will be more of a dongle. This is for three reasons: 1) people are expecting a little computer; 2) the dongle can establish the identity and location of the Mineserver owner so we can serve him/her from the nearest least-loaded instance, and; 3) requiring the dongle helps keep people from stealing service by trying to run more than one Mineserver or in more than one location.

The dongle/Mineserver is a Chinese travel router with WiFi and Ethernet that we can buy for $7 each with our branding and packaging. It tuns OpenWRT and all it has to do, really, is have a MAC address and respond to pings. So there is no way to login. Actually, there IS a way to login, but not for the user, just for the automatic firmware upgrades.

The buyer plugs their Mineserver into any USB port for power. It can be a computer or a power cube or switch. No data goes over USB, just power. Data can go by Ethernet or WiFi and we expect almost everyone will use WiFi.

The user registered with Mineserver.com when they ordered their device. At that time they named their Mineserver. No IP addresses, just DantheMan.mineserver.com or any other unique mineserver.com name they wanted. They also gave their WiFi network name and password, which is flashed to the Mineserver before shipping, so it automagically logs-in.

A $99 Mineserver is effectively a lifetime 10-player Minecraft server license. A $199 Mineserver Pro is a lifetime 25-player license. While this is scary, offering lifetime service, it all really depends on your definition of "lifetime." Kids move-on to other games. True, they can give away or sell their Mineserver, but most won't. So there will be attrition over time. The warranty only lasts a year, etc. The lifetime problem goes away slowly and -- at the same time -- monthly cloud costs are going down. Say we have $10 total in the dongle, that still leaves $89 PAID IN ADVANCE. If the average Mineserver lasts two years that's $3.70 per month for a $99 Mineserver and $7.40 per month for a Mineserver Pro.

Our goal is to provide service for less than these amounts AND to exit this business by selling to Mojang/Microsoft before we go completely broke.

That's not some pipe dream. We are the ONLY branded Minecraft hardware server authorized by Mojang. It's a long story.

Mineserver admin is through McMyAdmin just like everyone else. We can buy that license for $0.45 each in volume. The developer in the UK is a nice guy who drives a Tesla. The Admin is Mom, probably using her smart phone.

We were originally planning to add a Mumble voice chat server and may still, we just don't know what is best at this point (I was blind, remember).

All players are white-listed. No pervs.
View Robert’s profileRobert Cringely
Robert Cringely 12:22 AM
Now we finally get to the part where Minecraft is played.

When someone tries to login to DantheMan.mineserver.com, they are authorized (or rejected -- white list), the Mineserver is spun-up in its last-known state of play OR ASSIGNED (more on that later) at the data center with the shortest end-to-end ping time.

Play ensues. When the last player is leaves the game, the instance is either killed or reassigned as a different Mineserver, the point being to make optimal use of server resources. Even our KickStarter backers are all over the world, so we need a global cloud presence to make this work. I've been talking with a cloud vendor in Helsinki called UpCloud and I'd like something like that. Small and cheap but with a dozen data centers and we're big enough to matter to them.

On your end I'm sure you know that Kubernetes is spinning ip and down and assigning instances and making all this work smoothly.

One other thing we'd like to do is to have a door so every Mineserver can reach any other. You can lock your door, but it enables the cool kids to play in other worlds. We might also find a way to make multiple instances work together to look like a really big server for special occasions like MineServerCon.

What do you think? And how do you want to be involved?

We're open to great ideas.

Understand that we can see this growing quickly to hundreds of thousands of server instances worth millions of dollars -- dollars that Microsoft/Mojang will spend to bring us back inside the mother ship.

All the best,

Bob Cringely
