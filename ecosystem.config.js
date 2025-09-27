module.exports = {
    apps: [
        {
            name: "application-form-backend",
            script: "./dist/index.js",
            instances: "max-1",
            exec_mode: "cluster",
            max_memory_restart: "4G",
            node_args: "--max-old-space-size=4096",
            env_production: {
                NODE_ENV: "production",
                PORT:3000,
                APP_TYPE: "api"
            },
            error_file: "logs/api-err.log",
            out_file: "logs/api-out.log",
            log_file: "logs/api-combined.log",
            time: true,
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            merge_logs: true
        },
        {
            name: "application-form-worker",
            script: "./dist/queue/workers/index.js",
            instances: 1,
            exec_mode: "fork",
            max_memory_restart: "2G",
            node_args: "--max-old-space-size=2048",
            env_production: {
                NODE_ENV: "production",
                APP_TYPE: "worker"
            },
            error_file: "logs/worker-err.log",
            out_file: "logs/worker-out.log",
            log_file: "logs/worker-combined.log",
            time: true,
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            restart_delay: 1000,
            autorestart: true
        }
    ]
};
