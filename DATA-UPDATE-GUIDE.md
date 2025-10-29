# NCAA Stats Data Update Guide

This guide explains how to update the NCAA statistics data on your server.

## 📋 Quick Start - Simple Method (Recommended)

When you receive new weekly NCAA data files, follow these steps:

### Step 1: Upload New Data Files

From your **local machine**, upload the new files directly to the server:

```bash
# Replace the data files on the server (run from your local machine)
# Replace YOUR_USERNAME and YOUR_SERVER_IP with your actual server credentials
scp NCAAFProjections.json YOUR_USERNAME@YOUR_SERVER_IP:~/xaa-ssg/data/
scp NCAAFStandingsCurrent.json YOUR_USERNAME@YOUR_SERVER_IP:~/xaa-ssg/data/
scp NCAAFTeamRankings.json YOUR_USERNAME@YOUR_SERVER_IP:~/xaa-ssg/data/
scp tr_ncaaf_team_game_logs.json YOUR_USERNAME@YOUR_SERVER_IP:~/xaa-ssg/data/
```

### Step 2: Restart the Service

On your **server**, restart the NCAA Agent to load the new data:

```bash
# Load nvm (adjust Node version as needed)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use --delete-prefix v24.10.0 --silent

# Restart the NCAA Agent
pm2 restart ncaa-agent
```

### Step 3: Verify

Check that the service restarted successfully:

```bash
pm2 status
pm2 logs ncaa-agent --lines 20
```

That's it! Your new data is now live. 🎉

---

## 🛡️ Optional: Manual Backup Before Update

If you want to create a backup before updating (recommended for first-time updates):

```bash
# On the Ubuntu server
cd ~/xaa-ssg
mkdir -p data-backups/backup_$(date +"%Y%m%d_%H%M%S")
cp data/*.json data-backups/backup_$(date +"%Y%m%d_%H%M%S")/
```

To restore from a backup:

```bash
cp data-backups/backup_YYYYMMDD_HHMMSS/*.json data/
pm2 restart ncaa-agent
```

## 📁 Required Files

The NCAA Stats system uses these four JSON files:

| File | Description |
|------|-------------|
| `NCAAFProjections.json` | Season projections by conference |
| `NCAAFStandingsCurrent.json` | Current team standings |
| `NCAAFTeamRankings.json` | Team rankings and statistics |
| `tr_ncaaf_team_game_logs.json` | Individual game logs for all teams |

## ✅ Optional: Data Validation

To manually validate a JSON file before uploading:

```bash
# On your local machine (requires jq)
jq empty NCAAFProjections.json && echo "Valid JSON" || echo "Invalid JSON"
```

## 🔧 Troubleshooting

### PM2 command not found
```bash
# Load nvm first
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use --delete-prefix v24.10.0 --silent
```

### Service doesn't pick up new data
```bash
# Verify files were uploaded
ls -lh ~/xaa-ssg/data/

# Check file timestamps
ls -lt ~/xaa-ssg/data/

# Restart the service
pm2 restart ncaa-agent

# Check logs for errors
pm2 logs ncaa-agent --lines 50
```

### SCP upload fails
```bash
# Verify server is reachable
ping YOUR_SERVER_IP

# Test SSH connection
ssh YOUR_USERNAME@YOUR_SERVER_IP

# Make sure data directory exists
ssh YOUR_USERNAME@YOUR_SERVER_IP "ls -la ~/xaa-ssg/data/"
```

## 📅 Weekly Update Routine

Since NCAA data updates weekly, set a calendar reminder:

- **Recommended**: Every Monday at 9 AM
- Download new data from your provider
- Upload to server using the SCP commands above
- Restart the NCAA Agent
- Test with a quick query

## 🎯 Best Practices

1. **Create backups before major updates** - Especially at the start of the season
2. **Validate JSON files locally** - Use `jq` to check for syntax errors before uploading
3. **Test after updating** - Visit your application URL and try a few queries
4. **Monitor the logs** - Check for any errors after restarting the service
5. **Update during low traffic** - Early morning or late evening recommended

## 📞 Quick Reference

**Check service status:**
```bash
pm2 status
```

**View logs:**
```bash
pm2 logs ncaa-agent
```

**Restart service:**
```bash
pm2 restart ncaa-agent
```

**View current data files:**
```bash
ls -lh ~/xaa-ssg/data/
```
