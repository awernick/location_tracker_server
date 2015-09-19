# Production Server
server 'napkin-studio.com', user: 'deployer', roles: %w{app web}
set :deploy_to, "/var/www/location_tracker_server"
set :stage, :production

