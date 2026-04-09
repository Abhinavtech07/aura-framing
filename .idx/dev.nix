# IDX workspace configuration for Aura Framing
# Learn more: https://firebase.google.com/docs/studio/customize-workspace
{ ... }: {
  # Which nixpkgs channel to use
  channel = "stable-24.05"; # or "unstable"

  # Packages available in the environment
  packages = [
    # Node.js runtime
    pkgs.nodejs_20
    # Firebase CLI for hosting/deploy commands
    pkgs.nodePackages.firebase-tools
  ];

  # Environment variables
  env = { };

  idx = {
    # Extensions from Open VSX
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Run your dev server with IDX’s preview port
          command = ["npm" "run" "dev"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {
        # Install dependencies when workspace is created
        npm-install = "npm install";
      };
      onStart = {
        # Example: start background tasks if needed
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
