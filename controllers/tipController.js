// Static list of expert pet care tips based on seasons, lifecycle stages, and general health advice.
const petCareTips = [
    {
        id: 1,
        title: "Hydration is Key",
        category: "General Health",
        content: "Ensure your pet always has access to fresh, clean water. Dogs and cats need about 1 ounce of water per pound of body weight per day.",
        tags: ["hydration", "daily care"],
    },
    {
        id: 2,
        title: "Regular Dental Care",
        category: "Grooming & Hygiene",
        content: "Brush your pet's teeth regularly using pet-safe toothpaste. Dental chews and water additives can also help reduce plaque and tartar buildup.",
        tags: ["dental", "hygiene"],
    },
    {
        id: 3,
        title: "Summer Paws Detection",
        category: "Seasonal Care",
        content: "Hot pavement can burn your dog's paws. Walk them early in the morning or late in the evening. If the ground is too hot for the back of your hand, it's too hot for their paws.",
        tags: ["summer", "safety", "walking"],
    },
    {
        id: 4,
        title: "Winter Coat Protection",
        category: "Seasonal Care",
        content: "If you have a short-haired breed, consider a winter coat or sweater when walking in freezing temperatures to keep them warm.",
        tags: ["winter", "safety"],
    },
    {
        id: 5,
        title: "Mental Stimulation",
        category: "Activity",
        content: "Physical exercise isn't enough; pets need mental enrichment too! Try puzzle toys, lick mats, or learning new tricks to keep their mind sharp.",
        tags: ["enrichment", "training"],
    },
    {
        id: 6,
        title: "Portion Control",
        category: "Nutrition",
        content: "Follow feeding guidelines based on your pet's ideal weight, not their current weight if they are overweight. Avoid excessive treats, which should make up no more than 10% of their daily caloric intake.",
        tags: ["diet", "weight management"],
    },
    {
        id: 7,
        title: "Senior Pet Checkups",
        category: "Lifecycle",
        content: "Pets over 7 years old should visit the vet biannually. Look out for signs of arthritis, vision loss, or changes in eating habits.",
        tags: ["senior", "vet visits"],
    },
    {
        id: 8,
        title: "Flea & Tick Prevention",
        category: "Preventative",
        content: "Maintain year-round flea, tick, and heartworm prevention. Discuss the best options (topical vs. oral) with your veterinarian.",
        tags: ["parasites", "health"],
    },
    {
        id: 9,
        title: "Safe Socialization",
        category: "Behavior",
        content: "Proper socialization early in life helps prevent anxiety and aggression later on. Expose puppies and kittens to new sights, sounds, and people in a positive way.",
        tags: ["puppy", "kitten", "training"],
    },
    {
        id: 10,
        title: "Understanding Body Language",
        category: "Behavior",
        content: "A wagging tail doesn't always mean a happy dog; sometimes it indicates anxiety. Learn your pet's body language to better understand their comfort levels.",
        tags: ["communication", "safety"],
    }
];

// @desc    Get all pet care tips
// @route   GET /api/tips
// @access  Private
export const getTips = async (req, res) => {
    try {
        // We can expand this later to filter by pet breed or age passed in queries
        const categoryFilter = req.query.category;

        let filteredTips = petCareTips;

        if (categoryFilter) {
            filteredTips = petCareTips.filter(tip => tip.category.toLowerCase() === categoryFilter.toLowerCase());
        }

        res.status(200).json({
            success: true,
            data: filteredTips
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get a random pet care tip (for daily tip highlights)
// @route   GET /api/tips/daily
// @access  Private
export const getDailyTip = async (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * petCareTips.length);
        const dailyTip = petCareTips[randomIndex];

        res.status(200).json({
            success: true,
            data: dailyTip
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
