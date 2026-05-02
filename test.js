import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/get-comments', async (req, res) => {
    try {
        // const { bookId } = req.query; // 接收前端傳來的 w_6938_73
        
        // 依照你提供的 Path 格式動態生成 URL
        const targetUrl = `https://comic.naver.com/comment/api/community/v2/posts?pageId=webtoon_822931_91&categoryId=&pinRepresentation=none&pinType=&displayBlindCommentAsService=false&prevSize=0&nextSize=200`;
        // const targetUrl = `https://comic.naver.com/comment/api/community/v2/posts?pageId=webtoon_822931_86&categoryId=&pinRepresentation=none&displayBlindCommentAsService=false&prevSize=0&nextSize=${limit}&withCursor=false&offsetPostId=`;

        console.log(`🚀 正在發送請求至: ${targetUrl}`);

        const response = await axios.get(targetUrl, {
            headers: {
                'service-ticket-id': 'comic_webtoon',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
            }
        });
        
        res.json(response.data);
    } catch (error) {
        console.error("❌ API 報錯內容:", error.response ? JSON.stringify(error.response.data) : error.message);
        res.status(500).json({ 
            message: "抓取資料失敗", 
            detail: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));