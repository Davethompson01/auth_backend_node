import Database from "./database.ts";

(async () => {
    try {
        await Database.connect();

        const pool = Database.getPool();
        const [rows] = await pool.query('SELECT NOW() AS time_now');
        console.log("⏳ Current Time:", rows);

        // Your server logic starts here
    } catch (err) {
        console.error("❌ Failed to start application:", err);
        process.exit(1);
    }

    // Gracefully handle shutdown
    process.on("SIGINT", async () => {
        console.log("\n⚠️ Shutting down...");
        await Database.close();
        process.exit(0);
    });
})();
