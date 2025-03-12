import fs from "fs";
import path from "path";

// Directory to scan (update as needed)
const directory = "./src"; // Change this if needed

// Function to scan and fix image paths
function replaceImagePaths(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            replaceImagePaths(filePath); // Recursive for folders
        } else if (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".html")) {
            let content = fs.readFileSync(filePath, "utf8");

            // Replace incorrect paths
            const fixedContent = content.replace(/assets[\\/]+assets[\\/]+/g, "/assets/").replace(/src=["']assets[\\/]/g, 'src="/assets/');

            if (content !== fixedContent) {
                fs.writeFileSync(filePath, fixedContent, "utf8");
                console.log(`Fixed paths in: ${filePath}`);
            }
        }
    });
}

// Start fixing
replaceImagePaths(directory);
console.log("✅ Image paths updated successfully!");
