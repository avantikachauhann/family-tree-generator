# Family Tree Builder

The **Family Tree Builder** is a web application that helps you create and visualize your family tree. It allows you to add generations, members with custom icons, and relationships between members. The application also includes options to save progress, load previously saved data, and download the family tree as a JSON file for further use.

## Features

### 1. **Add Generations**
- Easily add new generations to your family tree.
- Each generation is displayed as a separate row.

### 2. **Add Members**
- Add members to any generation with a name and a custom icon.
- Choose icons from a predefined list or provide local file paths.

### 3. **Define Relationships**
- Connect two members with a defined relationship type.
- Relationships are visually represented with connecting lines and labeled types.

### 4. **Save and Load Progress**
- Save your family tree to the browser's local storage.
- Reload saved data anytime to continue editing.

### 5. **Export Family Tree**
- Download your family tree as a JSON file to store or share.

### 6. **Responsive Design**
- Mobile and tablet-friendly layout.
- Adapts to different screen sizes with intuitive UI.

---

## Getting Started

### Prerequisites
You need a modern web browser to run this application. No additional installations are required.

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/family-tree-builder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd family-tree-builder
   ```
3. Open `index.html` in your browser:
   ```bash
   open index.html
   ```

---

## Usage

### Add a Generation
1. Click the **Add Generation** button to create a new generation.
2. A new generation will appear in the tree.

### Add a Member
1. Click the **Add Member** button.
2. Enter the member’s name in the prompt.
3. Choose an icon from the available options or provide a local file path.
4. The member will be added to the last generation.

### Add Relationships
1. Click the **Add Relationship** button.
2. Select two members from the dropdown lists.
3. Define the relationship type.
4. A connecting line with the relationship label will appear between the members.

### Save or Load Progress
- Click **Save Progress** to save your tree to local storage.
- Click **Load Progress** to reload the saved tree.

### Export as JSON
- Click the **Download Tree** button to export the family tree as a JSON file.

---

## File Structure

```
family-tree-builder/
├── index.html          # Main HTML file
├── style.css           # CSS file for styling
├── script.js           # JavaScript file for logic
├── icons/              # Folder for custom icons
├── README.md           # Project documentation
```

---

## Technologies Used
- **HTML5** for structure
- **CSS3** for styling
- **JavaScript** for logic and interactivity

---

## Customization

### Add Custom Icons
1. Place your icon images in the `icons/` directory.
2. Update the `iconOptions` array in `script.js` with the local paths to your icons. Example:
   ```javascript
   const iconOptions = [
       './icons/grandfather.png',
       './icons/grandmother.png',
       './icons/father.png',
       './icons/mother.png'
   ];
   ```

### Change Color Scheme
- Modify colors in `style.css` to customize the look and feel of the app.
- Example:
   ```css
   body {
       background-color: #f4f1ea; /* Beige background */
       color: #5e412f; /* Brown text */
   }
   ```

---

## Responsive Design
The layout is fully responsive:
- Adjusts icons and text for smaller screens (mobile and tablet).
- Ensures buttons and dropdowns are accessible and visually aligned.

---

## Future Enhancements
- Drag-and-drop functionality for nodes.
- Export as an image (PNG/SVG).
- Search functionality to find members easily.
- Additional relationship types and visualization styles.

---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

---

**Happy Building Your Family Tree!**

