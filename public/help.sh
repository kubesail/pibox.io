#!/bin/bash
HELP_SCRIPT="/tmp/kubesail-support-$(date '+%s').sh"

curl -L https://raw.githubusercontent.com/kubesail/pibox-os/main/kubesail-support.sh -o $HELP_SCRIPT
chmod +x $HELP_SCRIPT
bash $HELP_SCRIPT
rm $HELP_SCRIPT
