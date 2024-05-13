const ctgryColor = (category) => {
    switch (category) {
        case 'Dessert':
            return 'bg-slate-200';
        case 'Beef':
            return 'bg-orange-200';
        case 'Vegetarian':
            return 'bg-red-300';
        case 'Chicken':
            return 'bg-blue-200';
        case 'Seafood':
            return 'bg-violet-100';
        case 'Pork':
            return 'bg-lime-200';
        case 'Side':
            return 'bg-fuchsia-300';
        case 'Lamb':
            return 'bg-yellow-200';
        case 'Miscellaneous':
            return 'bg-amber-300';
        case 'Pasta':
            return 'bg-pink-200';
        case 'Breakfast':
            return 'bg-yellow-300';
        case 'Starter':
            return 'bg-cyan-100';
        case 'Vegan':
            return 'bg-lime-300';
        case 'Cool':
            return 'bg-violet-300';
        case 'Goat':
            return 'bg-violet-400';
        case 'Misc':
            return 'bg-amber-400';
        default:
            return 'bg-slate-300';
    }
};

export { ctgryColor };
