// 音频管理器 - 处理游戏中的音乐和音效
class AudioManager {
    constructor() {
        this.bgmAudio = null;
        this.sfxAudio = null;
        this.isMuted = false;
        this.volume = 0.5;
        this.userInteracted = false;
        this.pendingBGM = null;
        
        // 监听用户的第一次交互
        const enableAudio = () => {
            this.userInteracted = true;
            console.log('用户已交互，音频功能已启用');
            
            // 隐藏音乐提示
            const musicHint = document.querySelector('.music-hint');
            if (musicHint) {
                musicHint.style.display = 'none';
            }
            
            // 如果有待播放的音乐，现在播放它
            if (this.pendingBGM) {
                this.playBGM(this.pendingBGM.path, this.pendingBGM.loop);
                this.pendingBGM = null;
            }
            
            // 移除事件监听器
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('keydown', enableAudio);
        };
        
        document.addEventListener('click', enableAudio);
        document.addEventListener('keydown', enableAudio);
    }
    
    playBGM(path, loop = true) {
        if (!this.userInteracted) {
            // 如果用户还没有交互，保存待播放的音乐
            this.pendingBGM = { path, loop };
            console.log('等待用户交互后播放音乐:', path);
            return;
        }
        
        if (this.isMuted) return;
        
        try {
            if (this.bgmAudio) {
                this.bgmAudio.pause();
                this.bgmAudio.currentTime = 0;
            }
            
            this.bgmAudio = new Audio(path);
            this.bgmAudio.volume = this.volume;
            this.bgmAudio.loop = loop;
            
            this.bgmAudio.play().catch(error => {
                console.warn('播放背景音乐失败:', error);
            });
            
            console.log('播放背景音乐:', path);
        } catch (error) {
            console.error('加载背景音乐失败:', error);
        }
    }
    
    playSFX(path, volume = 1.0) {
        if (!this.userInteracted || this.isMuted) return;
        
        try {
            this.sfxAudio = new Audio(path);
            this.sfxAudio.volume = this.volume * volume;
            
            this.sfxAudio.play().catch(error => {
                console.warn('播放音效失败:', error);
            });
            
            console.log('播放音效:', path);
        } catch (error) {
            console.error('加载音效失败:', error);
        }
    }
    
    stopBGM() {
        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.bgmAudio.currentTime = 0;
            console.log('停止背景音乐');
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.bgmAudio) {
            this.bgmAudio.volume = this.volume;
        }
        console.log('设置音量:', this.volume);
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.isMuted) {
            if (this.bgmAudio) {
                this.bgmAudio.pause();
            }
            console.log('音频已静音');
        } else {
            if (this.bgmAudio && this.userInteracted) {
                this.bgmAudio.play().catch(error => {
                    console.warn('恢复播放失败:', error);
                });
            }
            console.log('音频已取消静音');
        }
        
        return this.isMuted;
    }
    
    fadeOut(duration = 1000) {
        if (!this.bgmAudio) return;
        
        const startVolume = this.bgmAudio.volume;
        const fadeStep = startVolume / (duration / 50);
        
        const fadeInterval = setInterval(() => {
            if (this.bgmAudio.volume > fadeStep) {
                this.bgmAudio.volume -= fadeStep;
            } else {
                this.bgmAudio.volume = 0;
                this.bgmAudio.pause();
                clearInterval(fadeInterval);
                console.log('背景音乐淡出完成');
            }
        }, 50);
    }
    
    fadeIn(path, duration = 1000, loop = true) {
        this.playBGM(path, loop);
        
        if (!this.bgmAudio) return;
        
        this.bgmAudio.volume = 0;
        const targetVolume = this.volume;
        const fadeStep = targetVolume / (duration / 50);
        
        const fadeInterval = setInterval(() => {
            if (this.bgmAudio.volume < targetVolume - fadeStep) {
                this.bgmAudio.volume += fadeStep;
            } else {
                this.bgmAudio.volume = targetVolume;
                clearInterval(fadeInterval);
                console.log('背景音乐淡入完成');
            }
        }, 50);
    }
}
