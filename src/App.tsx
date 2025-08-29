import React, { useState } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard.tsx';
import SpeechRecognition from './components/SpeechRecognition.tsx';
import ResultDisplay from './components/ResultDisplay.tsx';

interface Question {
  id: number;
  question: string;
  sampleAnswer: string;
  category: string;
}

interface Part2Question {
  id: number;
  topic: string;
  mainQuestion: string;
  subQuestions: string[];
  sampleAnswer: string;
  category: string;
}

const sampleQuestions: Question[] = [
  // Your Country
  {
    id: 1,
    question: "Which part of your country do most people live in?",
    sampleAnswer: "Well, I think most people in my country live in and around Seoul. As you might expect, Seoul is the busiest city in Korea and a lot of people live there. But I think more people live on the outskirts of Seoul and commute in because the rent is cheaper and the air quality is a bit better than in the city.",
    category: "Part 1 - Your Country"
  },
  {
    id: 2,
    question: "Tell me about the main industries there.",
    sampleAnswer: "Well, I think the main industries in Seoul are technology and electronics. The city is home to major companies like Samsung, LG, and Hyundai, which create thousands of jobs. Apart from that, hospitality is also a big industry, with coffee shops and bars on almost every corner.",
    category: "Part 1 - Your Country"
  },
  {
    id: 3,
    question: "How easy is it to travel around your country?",
    sampleAnswer: "Actually, I think it's quite easy to travel around Korea. Trains and buses are frequent and affordable, which makes public transport really convenient. There's also a high-speed train that connects major cities, although it's a bit more expensive. On top of that, the roads are excellent, so driving is also a great option if you want more flexibility.",
    category: "Part 1 - Your Country"
  },
  {
    id: 4,
    question: "Has your country changed much since you were a child?",
    sampleAnswer: "Yes, I think it has changed massively since I was a child. It has become much more modern and internationally aware. These days, you can easily find food from all over the world and see lots of foreigners living and working in Korea. Technology has also developed rapidly—maybe even too much sometimes!",
    category: "Part 1 - Your Country"
  },
  
  // Your Home
  {
    id: 5,
    question: "Do you live in a house or a flat?",
    sampleAnswer: "I live in a basement flat, and it's a cozy space with everything I need. It has a washing machine, a dryer, and good ventilation, which makes it really comfortable to live in.",
    category: "Part 1 - Your Home"
  },
  {
    id: 6,
    question: "What are the differences between the place you live now and where you lived before?",
    sampleAnswer: "Well, I think the biggest difference is privacy. Before, I lived in a shared house and rented a single room, which meant I had to share the kitchen and bathroom with others. That wasn't always convenient. Now, I have my own space, which is larger and much more comfortable, and I really enjoy that.",
    category: "Part 1 - Your Home"
  },
  {
    id: 7,
    question: "Did you like the place you lived in as a child?",
    sampleAnswer: "Yes, I really liked it because I grew up on the 12th floor of a condo, and many of my friends lived in the same complex. We used to play soccer, baseball, and video games together almost every day, which made my childhood really fun and memorable.",
    category: "Part 1 - Your Home"
  },
  {
    id: 8,
    question: "Which part of your home do you like best?",
    sampleAnswer: "I'd say my favorite part is the living area because it feels spacious and comfortable. I also love the fact that I have a washing machine and dryer, which is super convenient. Plus, the ventilation system keeps the place fresh, especially after cooking.",
    category: "Part 1 - Your Home"
  },
  {
    id: 9,
    question: "In the future, what type of home would you like to live in?",
    sampleAnswer: "In the future, I'd love to live in a spacious condo because it's clean and low-maintenance. You don't have to worry about things like gardening, and most condos have great security, which would make me feel safe and comfortable.",
    category: "Part 1 - Your Home"
  },
  
  // Weekends
  {
    id: 10,
    question: "How do you usually spend your weekends?",
    sampleAnswer: "Well, these days I usually spend my weekends exploring Montreal because I've only been here for a few months. I especially enjoy visiting cozy coffee shops with a nice atmosphere. For example, I love sitting in a café, organizing my upcoming schedule, or working on side projects because it helps me stay focused and productive.",
    category: "Part 1 - Weekends"
  },
  {
    id: 11,
    question: "Which is your favourite part of the weekend?",
    sampleAnswer: "I'd say my favorite part is Saturday morning because it feels like the start of a relaxing and enjoyable weekend. I know I still have plenty of time ahead to do fun things and also relax on Sunday before going back to work.",
    category: "Part 1 - Weekends"
  },
  {
    id: 12,
    question: "Do you think your weekends are long enough?",
    sampleAnswer: "Actually, I think weekends are long enough, but they always feel short. Sometimes when I get a long weekend, I feel it can even be a bit too long. Of course, it's nice to have Monday off once in a while, but in general, two days are enough for me to rest and recharge.",
    category: "Part 1 - Weekends"
  },
  {
    id: 13,
    question: "How important do you think it is to have free time at the weekend?",
    sampleAnswer: "That's an interesting question. I think it's absolutely essential because without free time on weekends, people can't really recharge or relax. To stay productive during the week, we need to feel well-rested, so having time to unwind is vital for both our work performance and our overall well-being.",
    category: "Part 1 - Weekends"
  },
  
  // Transportation
  {
    id: 14,
    question: "How often do you use public transport?",
    sampleAnswer: "I usually take the bus every day because I need it to commute to and from work. It normally takes around an hour and a half, so I spend quite a bit of time on public transport.",
    category: "Part 1 - Transportation"
  },
  {
    id: 15,
    question: "When was the last time you travelled by public transport?",
    sampleAnswer: "Actually, it was this morning because I take the bus every day to go to work. It's often crowded, so I can't say I enjoy it, but it's still the most practical option for me.",
    category: "Part 1 - Transportation"
  },
  {
    id: 16,
    question: "Do you prefer to use a private car or public transport?",
    sampleAnswer: "Well, it depends on the situation, but generally I prefer public transport because it's punctual and much cheaper than owning a car. However, for long-distance travel, using a private car can be more convenient.",
    category: "Part 1 - Transportation"
  },
  {
    id: 17,
    question: "What form of transport would you recommend visitors to your hometown use?",
    sampleAnswer: "I'd definitely recommend visitors to use the Metro because it's fast, punctual, and very convenient for getting around. In Montreal, the Metro connects key areas like downtown and Old Montreal efficiently. It's also a great way to avoid traffic and explore the city comfortably.",
    category: "Part 1 - Transportation"
  },
  {
    id: 18,
    question: "Do you think people will drive more in the future?",
    sampleAnswer: "That's an interesting question. I think people will probably drive more in the future because many households are already buying more than one car for convenience. Unless public transport becomes more attractive, this trend is likely to continue.",
    category: "Part 1 - Transportation"
  },
  {
    id: 19,
    question: "Is driving to work popular in your country?",
    sampleAnswer: "Yes, it's very popular in Korea, mainly because public transport can take longer and follow fixed routes, which isn't always convenient. So a lot of people prefer the flexibility of driving to work.",
    category: "Part 1 - Transportation"
  },
  
  // Television
  {
    id: 20,
    question: "How often do you watch television?",
    sampleAnswer: "I usually watch TV almost every day, but only for about an hour. Some days I don't have time, and that's fine because I don't really need TV in my life. However, when I do watch, I enjoy it as a way to relax for a short while.",
    category: "Part 1 - Television"
  },
  {
    id: 21,
    question: "Which television channel do you usually watch?",
    sampleAnswer: "I'd say I mostly watch National Geographic because I'm really interested in programs about nature and wildlife. I love shows that study animals in the wild since that's something we rarely see in daily life, and I find it absolutely fascinating.",
    category: "Part 1 - Television"
  },
  {
    id: 22,
    question: "Do you enjoy the advertisements on television?",
    sampleAnswer: "Honestly, I definitely don't because advertisements are the most annoying part of watching TV. Just when I'm enjoying a good program, there's a five-minute break with ads. It makes me lose focus, and I often end up switching the channel.",
    category: "Part 1 - Television"
  },
  {
    id: 23,
    question: "Do you think that most programs on television are good?",
    sampleAnswer: "Actually, I don't think so because even though there are so many channels these days, I often struggle to find something interesting. A lot of shows feel repetitive, with similar jokes and ideas, which makes them quite boring for me.",
    category: "Part 1 - Television"
  },
  
  // Newspapers and Magazines
  {
    id: 24,
    question: "Which newspapers and magazines do you read?",
    sampleAnswer: "Well, these days I don't really read newspapers because I usually get news online. However, I do enjoy reading Sports Illustrated because I'm really into sports, especially baseball. It provides exciting coverage of games and players, which keeps me engaged. I particularly love reading about stats and player highlights, as they deepen my passion for the game.",
    category: "Part 1 - Newspapers"
  },
  {
    id: 25,
    question: "What kinds of article are you most interested in?",
    sampleAnswer: "I'd say I'm most interested in articles about economics and finance because I'm deeply interested in these areas, especially the stock market. I enjoy keeping up with market trends and investment strategies, and I think it's essential to understand what's happening in your country's economy.",
    category: "Part 1 - Newspapers"
  },
  {
    id: 26,
    question: "Have you ever read a magazine or newspaper in a foreign language?",
    sampleAnswer: "Yes, I have. I remember trying to read a French newspaper when I was in Montreal. The articles were interesting, but my French wasn't strong enough to fully understand everything. I struggled with some words and complex sentences, but it was still a great way to practice and learn more about the local culture.",
    category: "Part 1 - Newspapers"
  },
  {
    id: 27,
    question: "Do you think reading a newspaper or magazine in a foreign language is a good way to learn the language?",
    sampleAnswer: "Absolutely, because reading newspapers in a foreign language helps you learn vocabulary in context. When I tried reading a French newspaper in Montreal, it was challenging, but I picked up new words naturally. It's an engaging way to improve both language skills and cultural knowledge.",
    category: "Part 1 - Newspapers"
  },
  
  // Music
  {
    id: 28,
    question: "What kinds of music do you like?",
    sampleAnswer: "I'd say I usually enjoy band music and K-pop because they're energetic and uplifting. Listening to them really motivates me, especially when I need a boost of energy during the day.",
    category: "Part 1 - Music"
  },
  {
    id: 29,
    question: "When was the last time you went to a musical performance?",
    sampleAnswer: "I remember the last time was in April, when I went to a Coldplay concert in Korea with one of my friends. It was an amazing experience—the live atmosphere and energy from the crowd were absolutely unforgettable.",
    category: "Part 1 - Music"
  },
  {
    id: 30,
    question: "Do you feel that going to a concert is better than listening to a CD, or watching a concert on TV?",
    sampleAnswer: "Yes, I definitely think going to a concert is far better because the energy and interaction you experience there can't be matched by recordings or TV broadcasts. The excitement of the crowd and the live music create an unforgettable atmosphere.",
    category: "Part 1 - Music"
  },
  {
    id: 31,
    question: "Have you ever been in a choir or some other musical performance?",
    sampleAnswer: "Yes, I have. I remember when I was in elementary school, I learned to play the flute and joined a small music club. We even performed together at the school festival, which was a really fun experience.",
    category: "Part 1 - Music"
  },
  {
    id: 32,
    question: "Do students in your country have to study the creative arts, such as music?",
    sampleAnswer: "Yes, they do. In Korea, music is a required subject in elementary school, along with other creative arts like painting and sometimes dance. It's part of the national curriculum to give students a balanced education.",
    category: "Part 1 - Music"
  },
  
  // Musical Instrument
  {
    id: 41,
    question: "Which instrument do you like listening to most? and why?",
    sampleAnswer: "I'd say I enjoy listening to the guitar the most because I love band music. The sound of the guitar is so versatile, and it adds a lot of energy to songs. I even tried to learn it when I was a university student, but I gave up because it was quite challenging.",
    category: "Part 1 - Musical Instrument"
  },
  {
    id: 42,
    question: "Have you ever learned to play a musical instrument?",
    sampleAnswer: "Yes, I have. I remember learning to play the flute when I was in elementary school. It was my first real experience with music, and I really enjoyed performing with my classmates during school events.",
    category: "Part 1 - Musical Instrument"
  },
  {
    id: 43,
    question: "Do you think children should learn to play a musical instrument at school?",
    sampleAnswer: "Yes, I believe children should learn a musical instrument at school because it helps them develop creativity and discipline. For example, one of my friends learned the guitar in elementary school, and now he's a guitarist in a band.",
    category: "Part 1 - Musical Instrument"
  },
  {
    id: 44,
    question: "How easy would it be to learn a musical instrument without a teacher?",
    sampleAnswer: "I think it's possible these days because there are so many online resources like video tutorials and apps. Students can practice at home using platforms such as YouTube, so it's much easier than before, even without a personal teacher.",
    category: "Part 1 - Musical Instrument"
  },
  
  // Food
  {
    id: 45,
    question: "What sort of food do you like eating most?",
    sampleAnswer: "I'd say I prefer getting take-out food from restaurants because I don't really enjoy cooking. Since I live alone, I often end up wasting ingredients when I buy them for cooking, so take-out is much more convenient for me.",
    category: "Part 1 - Food"
  },
  {
    id: 46,
    question: "Who normally does the cooking in your house?",
    sampleAnswer: "As I live alone, I usually do the cooking myself. However, I only make very simple dishes, like grilling meat or preparing quick meals, because I'm not very skilled at cooking.",
    category: "Part 1 - Food"
  },
  {
    id: 47,
    question: "Do you watch cookery programs on TV?",
    sampleAnswer: "Not really, because I'm not very interested in cooking. So I hardly ever watch cooking shows, although sometimes I come across short food videos online by accident.",
    category: "Part 1 - Food"
  },
  {
    id: 48,
    question: "In general, do you prefer eating out or eating at home? why?",
    sampleAnswer: "I usually prefer eating at home because it's more relaxing and comfortable. I enjoy having a meal while watching TV, as it helps me unwind after a long day. Plus, home-cooked food is generally healthier and more affordable than eating out.",
    category: "Part 1 - Food"
  },
  {
    id: 49,
    question: "In your country, is it expensive to eat out?",
    sampleAnswer: "It didn't use to be very expensive, but these days the prices have gone up a lot. For example, a bowl of bibimbap used to cost around seven dollars, but now it's about fifteen. So eating out regularly can be quite pricey.",
    category: "Part 1 - Food"
  },
  {
    id: 50,
    question: "Tell me about a traditional Korean dish.",
    sampleAnswer: "A typical Korean meal usually consists of rice, soup, and several side dishes, known as banchan. These side dishes often include seasoned vegetables, meat, and sometimes fish. This combination is very common in Korean households and represents the balance of flavors and nutrition in our cuisine.",
    category: "Part 1 - Food"
  },
  
  // Snacks
  {
    id: 51,
    question: "Do you like to eat snacks?",
    sampleAnswer: "I'd say I really like eating snacks, especially chocolate bars like Snickers or chips such as Cheetos, simply because they're quick, tasty, and give me a little energy boost.",
    category: "Part 1 - Snacks"
  },
  {
    id: 52,
    question: "What snacks do you usually eat?",
    sampleAnswer: "Well, I usually go for chocolate bars like Snickers or salty snacks like Cheetos. Sometimes, I mix it up with biscuits or cookies, depending on my mood.",
    category: "Part 1 - Snacks"
  },
  {
    id: 53,
    question: "Do you still eat the same types of snacks that you ate when you were a child?",
    sampleAnswer: "Yes, I do. In fact, whenever I visit Korea, I remember buying the snacks I used to eat as a kid, and it always brings back a lot of good memories.",
    category: "Part 1 - Snacks"
  },
  {
    id: 54,
    question: "What was the most popular snack when you were a child?",
    sampleAnswer: "Well, back in my childhood, I'd say Pepero was the most popular snack. It's a thin biscuit stick covered with chocolate, and almost every kid loved it.",
    category: "Part 1 - Snacks"
  },
  {
    id: 55,
    question: "Are there any snacks that you have never eaten that you would like to try?",
    sampleAnswer: "Yes, I'd love to try some Dubai chocolates, because I've heard they're really rich and unique in flavor.",
    category: "Part 1 - Snacks"
  },
  {
    id: 56,
    question: "Would you like to try foreign snack?",
    sampleAnswer: "Definitely! If I had the chance, I would really like to try some French snacks, because they're famous for their pastries and sweets.",
    category: "Part 1 - Snacks"
  },
  
  // Friends
  {
    id: 57,
    question: "How often do you go out with friends?",
    sampleAnswer: "I usually meet my friends once or twice a month. We often go to nice restaurants and enjoy delicious food together, which is a great way to relax.",
    category: "Part 1 - Friends"
  },
  {
    id: 58,
    question: "Tell me about your best friend at school.",
    sampleAnswer: "I remember meeting my best friend in high school. We had similar personalities and interests. For example, we both loved baseball and band music, so we often went to games and concerts together.",
    category: "Part 1 - Friends"
  },
  {
    id: 59,
    question: "How friendly are you with your neighbours?",
    sampleAnswer: "Honestly, I'm not very close with my neighbours. We usually just say hello, but we don't really hang out or talk much.",
    category: "Part 1 - Friends"
  },
  {
    id: 60,
    question: "Which is more important to you, friends or family?",
    sampleAnswer: "Well, in my opinion, family is definitely more important, because they've always been there for me and supported me in every situation.",
    category: "Part 1 - Friends"
  },
  
  // Festivals and Celebrations
  {
    id: 65,
    question: "How do you usually celebrate your birthday?",
    sampleAnswer: "I usually celebrate by going out for dinner with my friends. I like keeping it simple and spending quality time with people I care about.",
    category: "Part 1 - Festivals"
  },
  {
    id: 66,
    question: "How did you celebrate your last birthday?",
    sampleAnswer: "Last year, I remember celebrating my birthday with a nice dinner at a restaurant with friends. It was really enjoyable.",
    category: "Part 1 - Festivals"
  },
  {
    id: 67,
    question: "How do you think you will celebrate your next birthday?",
    sampleAnswer: "I'd like to spend my next birthday in Korea with my family. I think it would be really special because I don't get to see them very often.",
    category: "Part 1 - Festivals"
  },
  {
    id: 68,
    question: "What is the most important day of the year for you?",
    sampleAnswer: "That's an interesting question. For me, New Year's Day is the most important day, because it's a time to reconnect with my family and wish each other a happy and successful year ahead.",
    category: "Part 1 - Festivals"
  },
  
  // Wedding
  {
    id: 69,
    question: "Can you talk about some things people do at a traditional wedding?",
    sampleAnswer: "That's an interesting question. In my country, people usually have a ceremony where the couple exchanges vows and rings. After that, there's often a big meal with friends and family, and sometimes traditional performances like music or dancing.",
    category: "Part 1 - Wedding"
  },
  {
    id: 70,
    question: "How important is marriage in a person's life?",
    sampleAnswer: "Well, in my opinion, marriage is a really important decision because it means finding someone to spend your whole life with. For me, it's something that requires a lot of thought and commitment.",
    category: "Part 1 - Wedding"
  },
  {
    id: 71,
    question: "What is the difference of what people think about marriage compared to the past?",
    sampleAnswer: "That's an interesting question. I think in the past, people often saw marriage as a duty or even a social expectation. But nowadays, many people see it more as a personal choice, focusing on love and compatibility rather than just tradition.",
    category: "Part 1 - Wedding"
  },
  {
    id: 72,
    question: "What do people wear at a wedding?",
    sampleAnswer: "In my country, the bride usually wears a white wedding dress, while the groom often wears a suit or a tuxedo. In traditional Korean weddings, some couples also wear hanbok, which adds a cultural touch to the ceremony.",
    category: "Part 1 - Wedding"
  },
  
  // Family
  {
    id: 73,
    question: "Can you tell me about your family?",
    sampleAnswer: "My family has four members: my parents, my sister, and me. My parents run a small beauty salon, which they love doing. My sister works as an officer at city hall. We're very close and enjoy spending weekends together, like our recent barbecue party in the backyard.",
    category: "Part 1 - Family"
  },
  {
    id: 74,
    question: "How much time do you spend with your family?",
    sampleAnswer: "Honestly, these days I don't see my family much because they all live in Korea. But when I was there, we used to meet about once a month and have dinner together, which was really nice.",
    category: "Part 1 - Family"
  },
  {
    id: 75,
    question: "What do you like to do with your family?",
    sampleAnswer: "I'd say I really enjoy having a barbecue party with my family. It's a great chance to eat good food, talk, and simply spend quality time together.",
    category: "Part 1 - Family"
  },
  {
    id: 76,
    question: "Who are you closest to in your family?",
    sampleAnswer: "I'm definitely closest to my mom. She has always supported me and I feel comfortable sharing everything with her.",
    category: "Part 1 - Family"
  },
  
  // Flowers
  {
    id: 77,
    question: "Do you like flowers?",
    sampleAnswer: "Yes, I do. I think flowers are simple but beautiful, and they always make the atmosphere brighter.",
    category: "Part 1 - Flowers"
  },
  {
    id: 78,
    question: "What kinds of flowers do you like the most?",
    sampleAnswer: "I'd say I like roses the most, simply because they look elegant and they also symbolize love and affection.",
    category: "Part 1 - Flowers"
  },
  {
    id: 79,
    question: "When do people in your country normally give flowers to others?",
    sampleAnswer: "In Korea, people usually give flowers on special occasions like weddings, graduations, or even funerals. It's a way to celebrate or show respect.",
    category: "Part 1 - Flowers"
  },
  {
    id: 80,
    question: "When was the last time you gave flowers to someone?",
    sampleAnswer: "I remember giving flowers about three years ago when one of my relatives passed away. In Korea, it's common to send funeral wreaths to express condolences.",
    category: "Part 1 - Flowers"
  },
  {
    id: 81,
    question: "Are there any flowers that have special meaning to people in your country?",
    sampleAnswer: "Yes, in Korea, chrysanthemums often symbolize mourning, so they're used in funerals. On the other hand, roses are usually connected with love, and carnations are very meaningful on Parents' Day because they represent respect and gratitude.",
    category: "Part 1 - Flowers"
  },
  
  // Weather & Seasons
  {
    id: 86,
    question: "What's the weather like in your hometown?",
    sampleAnswer: "Well, I'm from Seoul, and the weather there is quite diverse. We have hot and humid summers, cold winters with some snow, and mild spring and autumn seasons.",
    category: "Part 1 - Weather"
  },
  {
    id: 87,
    question: "Would you prefer to live in a place with one season all year round, or four different seasons?",
    sampleAnswer: "I'd say I prefer living in a place with just one season. For example, I stayed in Miami for a few months, and I liked it because I didn't need many clothes and the weather was always predictable.",
    category: "Part 1 - Weather"
  },
  {
    id: 88,
    question: "Do you do different activities in different seasons?",
    sampleAnswer: "The activities vary a lot by season. In summer, people enjoy going to the beach, swimming, or having outdoor barbecues. In winter, skiing and snowboarding are very popular in the mountains. Spring is perfect for hiking or going on picnics under the cherry blossoms, while autumn is ideal for visiting national parks and enjoying the fall foliage. Each season offers a unique experience, which is one reason tourism is strong all year round.",
    category: "Part 1 - Weather"
  },
  {
    id: 89,
    question: "Does the weather have much impact on your life?",
    sampleAnswer: "Yes, the weather impacts my life a lot. For example, on sunny days, I feel energetic and go jogging in the park. But on rainy days, I stay home, maybe watching movies, and feel less active. Bad weather, like storms, can also cancel plans, such as picnics with friends.",
    category: "Part 1 - Weather"
  },
  {
    id: 90,
    question: "What sort of weather do you prefer?",
    sampleAnswer: "I prefer hot weather, mainly because it's perfect for swimming and I really enjoy outdoor activities in the sun.",
    category: "Part 1 - Weather"
  },
  {
    id: 91,
    question: "Would you prefer to go to a hot place, or a cold place for a holiday?",
    sampleAnswer: "I'd pick a hot place, like Miami, for a holiday because I love sunny weather for swimming at the beach. It feels relaxing and fun. Cold places, like a ski resort, are okay for skiing, but I find heavy winter clothes uncomfortable.",
    category: "Part 1 - Weather"
  },
  {
    id: 92,
    question: "How do rainy days make you feel?",
    sampleAnswer: "Honestly, rainy days make me feel less active. I usually stay indoors and don't feel very motivated to go out.",
    category: "Part 1 - Weather"
  },
  {
    id: 93,
    question: "What's your favourite season of the year?",
    sampleAnswer: "My favourite season is definitely summer, because I can go swimming and spend more time outdoors.",
    category: "Part 1 - Weather"
  },
  {
    id: 94,
    question: "What do you like to do when it's hot?",
    sampleAnswer: "When it's hot, I usually like to go swimming. It's refreshing and a fun way to cool down.",
    category: "Part 1 - Weather"
  },
  {
    id: 95,
    question: "What do you usually do in the winter?",
    sampleAnswer: "In the winter, I usually stay at home and watch Netflix. It's a cozy way to spend the cold season.",
    category: "Part 1 - Weather"
  },
  
  // Clothes & Fashion
  {
    id: 96,
    question: "How important are clothes and fashion to you?",
    sampleAnswer: "Well, I think clothes and fashion are quite important, because they show your personality and also help you feel confident in different situations.",
    category: "Part 1 - Fashion"
  },
  {
    id: 97,
    question: "What kind of clothes do you dislike?",
    sampleAnswer: "I don't really like wearing suits. Back in Korea, I had to wear one for work, and honestly, it wasn't very comfortable for me.",
    category: "Part 1 - Fashion"
  },
  {
    id: 98,
    question: "How different are the clothes you wear now from those you wore 10 years ago?",
    sampleAnswer: "About 10 years ago, I was more interested in fashion, so I tried many different styles. These days, though, I just dress casually and don't care too much about trends.",
    category: "Part 1 - Fashion"
  },
  {
    id: 99,
    question: "What do you think the clothes we wear say about us?",
    sampleAnswer: "That's a good question. I think the clothes we wear often show our personality, lifestyle, and sometimes even our social status. For example, someone wearing sportswear might be seen as active, while formal clothes can show professionalism.",
    category: "Part 1 - Fashion"
  },
  {
    id: 100,
    question: "Do you like shopping for clothes?",
    sampleAnswer: "Yes, I do. I usually enjoy going to outlets and buying clothes in bulk, because it saves both money and time.",
    category: "Part 1 - Fashion"
  },
  {
    id: 101,
    question: "Have you ever bought clothes that you don't like?",
    sampleAnswer: "Yes, I remember once buying a long coat because my girlfriend liked that style. But honestly, I didn't enjoy wearing it because it felt uncomfortable.",
    category: "Part 1 - Fashion"
  },
  
  // Social Network
  {
    id: 102,
    question: "What kind of social networking websites do you like to use?",
    sampleAnswer: "I mostly use LinkedIn, since it's a great platform for networking with people in the same industry, especially in software engineering.",
    category: "Part 1 - Social Network"
  },
  {
    id: 103,
    question: "Do you think social media will become more popular in the future?",
    sampleAnswer: "Of course. In my opinion, social media will keep growing, especially if platforms become more specialized. For example, LinkedIn targets professionals, and I think this kind of focus will attract even more users in the future.",
    category: "Part 1 - Social Network"
  },
  {
    id: 104,
    question: "Do you like to use Facebook?",
    sampleAnswer: "Yes, I do. I especially enjoy using the marketplace feature, because it's convenient for buying and selling second-hand items.",
    category: "Part 1 - Social Network"
  },
  {
    id: 105,
    question: "Do you feel social media is more a positive thing, or more negative thing?",
    sampleAnswer: "That's a tricky one. I'd say social media has both positive and negative sides. On the one hand, it helps people stay connected, but on the other hand, it can also cause problems like addiction or spreading misinformation.",
    category: "Part 1 - Social Network"
  },
  {
    id: 106,
    question: "Do you use social media websites?",
    sampleAnswer: "Yes, I do. I use a few different platforms, but mainly LinkedIn for professional networking and Facebook for personal use.",
    category: "Part 1 - Social Network"
  },
  
  // Swimming
  {
    id: 107,
    question: "Do you like swimming?",
    sampleAnswer: "Yes, I do. I really enjoy swimming because it's both relaxing and a good way to stay healthy.",
    category: "Part 1 - Swimming"
  },
  {
    id: 108,
    question: "What do you think are the advantages of swimming?",
    sampleAnswer: "Well, in my opinion, swimming has many advantages. It's a full-body workout, it's gentle on the joints, and it can also be a lifesaving skill.",
    category: "Part 1 - Swimming"
  },
  {
    id: 109,
    question: "Did you learn to swim when you were young?",
    sampleAnswer: "Yes, I did. I remember learning how to swim at school during PE class, and it was actually quite fun.",
    category: "Part 1 - Swimming"
  },
  {
    id: 110,
    question: "Should it be compulsory for children to learn to swim when they are at school?",
    sampleAnswer: "Yes, I think so. Swimming is not only good for health, but also an essential safety skill that can prevent accidents.",
    category: "Part 1 - Swimming"
  },
  {
    id: 111,
    question: "How do most people in your country learn to swim?",
    sampleAnswer: "In Korea, I think most people learn to swim either at school or in public sports centers. There are also many private swimming pools where children take lessons.",
    category: "Part 1 - Swimming"
  },
  {
    id: 112,
    question: "Is swimming very popular in your country?",
    sampleAnswer: "Yes, it's quite popular. Many people enjoy swimming in the summer, and indoor pools are also common, so people can swim all year round.",
    category: "Part 1 - Swimming"
  },
  
  // Noise
  {
    id: 113,
    question: "Do you mind noises?",
    sampleAnswer: "Not really. I usually don't mind everyday noises, although loud construction sounds can be a bit annoying.",
    category: "Part 1 - Noise"
  },
  {
    id: 114,
    question: "What types of noise do you come across in your daily life?",
    sampleAnswer: "Well, I often hear traffic noise, people talking in public places, and sometimes music coming from shops or cafés.",
    category: "Part 1 - Noise"
  },
  {
    id: 115,
    question: "Are there any sounds that you like?",
    sampleAnswer: "Yes, I really like the sound of rain falling. It makes me feel calm and relaxed, especially when I'm at home.",
    category: "Part 1 - Noise"
  },
  {
    id: 116,
    question: "Where can you hear loud noises?",
    sampleAnswer: "You can usually hear loud noises on busy streets, near construction sites, or at concerts and festivals.",
    category: "Part 1 - Noise"
  },
  {
    id: 117,
    question: "Do you think there's too much noise in modern society?",
    sampleAnswer: "That's an interesting question. I think in modern society, there is definitely more noise because of heavy traffic, technology, and urban development. It can sometimes affect people's health and concentration.",
    category: "Part 1 - Noise"
  },
  {
    id: 118,
    question: "Are cities becoming noisier?",
    sampleAnswer: "Yes, I believe so. As cities grow bigger with more cars and construction, the noise levels naturally increase.",
    category: "Part 1 - Noise"
  },
  
  // Outdoor activities
  {
    id: 119,
    question: "What do you do in your spare time?",
    sampleAnswer: "In my free time, I usually watch Netflix while enjoying some delicious food. It helps me relax after a busy day.",
    category: "Part 1 - Outdoor Activities"
  },
  {
    id: 120,
    question: "Do you like outdoor activities?",
    sampleAnswer: "Yes, I do. I think outdoor activities are a great way to stay active and enjoy nature.",
    category: "Part 1 - Outdoor Activities"
  },
  {
    id: 121,
    question: "What outdoor activities do you like to do?",
    sampleAnswer: "I usually enjoy hiking and swimming, because they keep me healthy and give me a chance to spend time in nature.",
    category: "Part 1 - Outdoor Activities"
  },
  {
    id: 122,
    question: "How often do you do that?",
    sampleAnswer: "When I lived in Vancouver, I went hiking about once or twice a month because there were so many mountains nearby. But now in Montreal, I don't know the places well yet, so I haven't gone much.",
    category: "Part 1 - Outdoor Activities"
  },
  {
    id: 123,
    question: "What outdoor sports do you like?",
    sampleAnswer: "I like swimming and hiking the most, since they combine fitness with enjoying the outdoors.",
    category: "Part 1 - Outdoor Activities"
  },
  {
    id: 124,
    question: "How much time do you spend outdoors every week?",
    sampleAnswer: "On average, I'd say I spend about four to six hours outdoors each week, depending on the weather and my schedule.",
    category: "Part 1 - Outdoor Activities"
  },
  {
    id: 125,
    question: "What outdoor activities are popular in your country?",
    sampleAnswer: "In Korea, hiking is extremely popular because there are so many mountains. People also enjoy jogging, cycling, and playing soccer in parks.",
    category: "Part 1 - Outdoor Activities"
  },
  
  // Painting
  {
    id: 126,
    question: "Do you like painting or drawing?",
    sampleAnswer: "Not really. I don't draw very often, but I can still appreciate art when I see it.",
    category: "Part 1 - Painting"
  },
  {
    id: 127,
    question: "How often do you visit art galleries?",
    sampleAnswer: "Honestly, I don't visit them very often, maybe once or twice a year when there's a special exhibition.",
    category: "Part 1 - Painting"
  },
  {
    id: 128,
    question: "What kinds of things do you like to draw?",
    sampleAnswer: "If I do draw, I usually like to sketch simple things like nature scenes or small objects. But I'm not very skilled at it.",
    category: "Part 1 - Painting"
  },
  {
    id: 129,
    question: "Is it easy to learn how to draw?",
    sampleAnswer: "Well, I think drawing is not very easy. It takes a lot of practice and patience, although some people seem to have a natural talent for it.",
    category: "Part 1 - Painting"
  },
  
  // General Questions
  {
    id: 130,
    question: "Do you work or study at the moment?",
    sampleAnswer: "At the moment, I'm working in the software engineering field. It keeps me busy but also challenges me in a good way.",
    category: "Part 1 - General"
  },
  {
    id: 131,
    question: "What do you like doing in your free time?",
    sampleAnswer: "In my free time, I like to relax by watching Netflix or trying out new restaurants with friends.",
    category: "Part 1 - General"
  },
  {
    id: 132,
    question: "What type of photos do you like taking?",
    sampleAnswer: "I usually like taking photos of nature, like sunsets, beaches, and mountains, because they look beautiful and peaceful.",
    category: "Part 1 - General"
  },
  {
    id: 133,
    question: "What do you do with the photos you take?",
    sampleAnswer: "Most of the time, I just keep them on my phone, but sometimes I share them on social media with friends.",
    category: "Part 1 - General"
  },
  {
    id: 134,
    question: "When you visit other places, do you take photos or buy postcards?",
    sampleAnswer: "I usually take photos, because it feels more personal and captures the exact moment I experienced. Postcards don't really have that personal touch.",
    category: "Part 1 - General"
  },
  {
    id: 135,
    question: "Do you like people taking photos of you?",
    sampleAnswer: "Not really. I don't feel very comfortable in front of the camera, so I prefer taking photos of others or landscapes instead.",
    category: "Part 1 - General"
  },
  
  // Others
  {
    id: 136,
    question: "Talk about where you live",
    sampleAnswer: "I've been living in Montreal for three months now, and I really enjoy its vibrant vibe, with lots of shops, cozy cafes, and great public transport. Since French is the primary language here, it's a fantastic place to learn it, and I'm taking part-time French classes, which is fun but challenging.",
    category: "Part 1 - Others"
  },
  {
    id: 137,
    question: "Are you a student or do you work?",
    sampleAnswer: "I'm currently a software engineer, and I've been working in this field for eight years. My job involves designing and developing software applications, which I find it really fulfilling. I enjoy it because it's challenging and allows me to solve complex problems every day.",
    category: "Part 1 - Others"
  },
  {
    id: 138,
    question: "Talk about your job/studies",
    sampleAnswer: "I work as a senior software engineer, and my main role is to oversee the entire software development process. This includes designing applications, writing code, testing features, and deploying them to the production environment. I also enjoy mentoring junior developers, helping them improve their skills, which is really rewarding.",
    category: "Part 1 - Others"
  },
  {
    id: 139,
    question: "Where do you like to go on holiday?",
    sampleAnswer: "During holidays, I love spending time in a coffee shop. I enjoy the cozy atmosphere, sipping coffee while managing my upcoming schedule or working on side projects. It helps me stay focused and makes my holiday feel both productive and relaxing.",
    category: "Part 1 - Others"
  },
  {
    id: 140,
    question: "Do you have any hobbies?",
    sampleAnswer: "Yes, one of my favorite hobbies is watching Korean dramas on Netflix, especially shows like Squid Game because they're so exciting and well-produced. It's a great way for me to unwind after a long day, and I really enjoy how the English subtitles help me pick up new vocabulary.",
    category: "Part 1 - Others"
  },
  {
    id: 141,
    question: "What do you normally do in the evening?",
    sampleAnswer: "In the evening, I usually stay at home and watch Netflix. It helps me relax after a long day, and I find it quite enjoyable. Another reason I like doing this is that Netflix offers subtitles in different languages, so I often watch shows with English subtitles. That way, I can both enjoy the story and improve my language skills at the same time.",
    category: "Part 1 - Others"
  }
];

const part2Questions: Part2Question[] = [
  {
    id: 1,
    topic: "Weather",
    mainQuestion: "Describe a kind of weather you like",
    subQuestions: [
      "What it is",
      "Where you usually experience it", 
      "What you will do in this weather",
      "and explain why you like it"
    ],
    sampleAnswer: "One type of weather I really enjoy is hot and sunny weather. Bright sunshine and warm temperatures always put me in a good mood.\n\nI usually experience this weather when I visit Miami, Florida, which is famous for its beaches and tropical climate. The sun is almost always shining there, and the warmth near the ocean feels very inviting.\n\nDuring this weather, I love swimming, relaxing by the water, or fishing with friends. It's a perfect way to enjoy the outdoors and the lively atmosphere of the city.\n\nI like hot and sunny weather because it makes me feel energetic and carefree. I can wear light clothes comfortably, spend time outdoors, and it just leaves me with happy memories.",
    category: "Part 2 - Weather"
  },
  {
    id: 2,
    topic: "Place",
    mainQuestion: "Describe a place you would like to visit",
    subQuestions: [
      "Where it is",
      "How you know about this place",
      "What you would do there",
      "and explain why you would like to visit this place"
    ],
    sampleAnswer: "A place I would really like to visit is Japan, specifically Tokyo. I've always been fascinated by Japanese culture, technology, and cuisine.\n\nI know about this place through various sources - documentaries, travel shows, and friends who have visited. I've also read about its rich history and modern innovations.\n\nIf I could visit, I would explore the traditional temples and shrines, try authentic Japanese food like sushi and ramen, visit the famous Shibuya crossing, and experience the unique blend of old and new that Tokyo offers.\n\nI want to visit Japan because it represents the perfect balance between preserving tradition and embracing innovation. The culture seems so different from what I'm used to, and I think it would be an eye-opening experience.",
    category: "Part 2 - Place"
  }
];

function App() {
  const [currentPart, setCurrentPart] = useState<'part1' | 'part2'>('part1');
  const [currentQuestion, setCurrentQuestion] = useState<Question>(sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)]);
  const [currentPart2Question, setCurrentPart2Question] = useState<Part2Question>(part2Questions[0]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);




  const getRandomQuestion = () => {
    if (currentPart === 'part1') {
      const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
      const randomQuestion = sampleQuestions[randomIndex];
      setCurrentQuestion(randomQuestion);
    } else {
      const randomIndex = Math.floor(Math.random() * part2Questions.length);
      const randomPart2Question = part2Questions[randomIndex];
      setCurrentPart2Question(randomPart2Question);
    }
    setUserAnswer('');
    setSimilarityScore(null);
    setShowResult(false);
  };

  const handleRecordingComplete = (transcript: string) => {
    setUserAnswer(transcript);
    setCurrentTranscript('');
    setIsRecording(false);
  };

  const calculateSimilarity = () => {
    if (!userAnswer.trim()) return;
    
    // 간단한 유사도 계산 (실제로는 더 정교한 알고리즘이 필요)
    const userWords = userAnswer.toLowerCase().split(/\s+/);
    const sampleWords = currentQuestion.sampleAnswer.toLowerCase().split(/\s+/);
    
    const commonWords = userWords.filter(word => sampleWords.includes(word));
    const similarity = (commonWords.length / Math.max(userWords.length, sampleWords.length)) * 100;
    
    setSimilarityScore(Math.round(similarity));
    setShowResult(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎤 IELTS 스피킹 연습1</h1>
      </header>
      
      <main className="App-main">
        <div className="part-selector">
          <button 
            onClick={() => {
              setCurrentPart('part1');
              setUserAnswer('');
              setCurrentTranscript('');
              setSimilarityScore(null);
              setShowResult(false);
            }} 
            className={`part-button ${currentPart === 'part1' ? 'active' : ''}`}
          >
            Part 1
          </button>
          <button 
            onClick={() => {
              setCurrentPart('part2');
              setUserAnswer('');
              setCurrentTranscript('');
              setSimilarityScore(null);
              setShowResult(false);
            }} 
            className={`part-button ${currentPart === 'part2' ? 'active' : ''}`}
          >
            Part 2
          </button>
        </div>

        <div className="question-controls">
          <button onClick={getRandomQuestion} className="random-button">
            🎲 랜덤 문제 선택
          </button>
        </div>

        {currentPart === 'part1' ? (
          <QuestionCard question={currentQuestion} />
        ) : (
          <div className="part2-question">
            <h2>{currentPart2Question.topic}</h2>
            <h3>{currentPart2Question.mainQuestion}</h3>
            <div className="sub-questions">
              <p>You should say:</p>
              <ul>
                {currentPart2Question.subQuestions.map((subQ, index) => (
                  <li key={index}>{subQ}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <SpeechRecognition
          isRecording={isRecording}
          onStartRecording={() => {
            setIsRecording(true);
            setCurrentTranscript('');
          }}
          onStopRecording={() => setIsRecording(false)}
          onRecordingComplete={handleRecordingComplete}
          onTranscriptUpdate={setCurrentTranscript}
        />

        {isRecording && (
          <div className="user-answer">
            <h3>🎤 실시간 음성 인식:</h3>
            <p style={{ fontStyle: 'italic', color: '#666' }}>
              {currentTranscript || '음성을 인식하고 있습니다...'}
            </p>
          </div>
        )}

                {userAnswer && !isRecording && (
          <div className="user-answer">
            <h3>🎤 당신의 답변:</h3>
            <p>{userAnswer}</p>
            <button onClick={calculateSimilarity} className="compare-button">
              📊 유사도 분석하기
            </button>
          </div>
        )}

        {showResult && similarityScore !== null && (
          <ResultDisplay
            similarityScore={similarityScore}
            userAnswer={userAnswer}
            sampleAnswer={currentPart === 'part1' ? currentQuestion.sampleAnswer : currentPart2Question.sampleAnswer}
          />
        )}
      </main>
    </div>
  );
}

export default App;
