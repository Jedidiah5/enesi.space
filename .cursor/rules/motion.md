# UI Animation Rules

## Library
Always use Framer Motion for UI animations. Do not use CSS transitions
for interactive elements.

## Spring Physics
- Hover interactions: type "spring", damping 20, stiffness 300
- Entrance animations: type "spring", damping 25, stiffness 250
- Button press (whileTap): type "spring", damping 15, stiffness 400
- Exit animations: type "spring", damping 22, stiffness 280

## Stagger Patterns
- List items: staggerChildren 0.05
- Grid items: staggerChildren 0.08
- Section groups: staggerChildren 0.15

## Required Patterns
- All list/grid components must use variants with staggerChildren
- All interactive elements must have whileHover and whileTap
- All route changes must use AnimatePresence
- All components must respect prefers-reduced-motion

## Grid Entrance Animation Spec
- Container: staggerChildren 0.08
- Items: opacity 0→1, y 24→0, scale 0.96→1
- Transition: spring, damping 25, stiffness 250
- whileHover: y -4, scale 1.02
- whileTap: scale 0.98
- Use whileInView for below-fold grids (viewport: once true, margin "-80px")

## Easing
- Default: [0.16, 1, 0.3, 1]
- Enter: [0, 0, 0.2, 1]
- Exit: [0.4, 0, 1, 1]

