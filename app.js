const puppeteer = require('puppeteer');

const log  = (code) => {
    console.log(code)
}

class Instagram {
    constructor(userName, passWord, pageName) {
        this.userName = userName
        this.passWord = passWord
        this.pageName = pageName
        this.typeSpeed = 200
    }

    async start() {
        const url = 'https://www.instagram.com'

        const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--start-fullscreen']})
        const page = await browser.newPage()
            this.page = page
        await this.page.setViewport({
            width: 1920,
            height: 1080,
        })

        try {
            await page.goto(url);
        } catch {
            this.page.reload()
        }

        this.pre_login()
    }

    async pre_login() {
        await this.page.waitForSelector('button.aOOlW.bIiDR')
        await this.page.click('button.aOOlW.bIiDR')
        log('Accept Cookies')

        await this.page.waitForTimeout(2000)
        this.login()
    }

    async login() {

        log('Input Username And Password')
        await this.page.waitForSelector('input[name="username"]')
        await this.page.type('input[name="username"]', this.userName, {delay: this.typeSpeed})
        await this.page.type('input[name="password"]', this.passWord, {delay: this.typeSpeed})
        await this.page.click('button.sqdOP.L3NKy.y3zKF')

        this.skip_facebook()
    }

    async skip_facebook() {
        try {
            await this.page.waitForTimeout(5000)
            await this.page.click('button._42ft._4jy0._9o-t._4jy3._4jy1.selected._51sy')
            await this.page.click('a._97w6')
            this.login()
            
        } catch {
            log('No Facebook or Skipped')
            this.scrape()
        }
    }

    async scrape() {
        try {
            await this.page.waitForTimeout(2000)
            await this.page.click('button.sqdOP.yWX7d.y3zKF')
            log('Save Login Info = No')
        } catch {
            log('No Pop Up Save Login Info')
        }

        try {
            await this.page.waitForTimeout(2000)
            await this.page.click('button.aOOlW.HoLwm')
            log('Turn Off Notification')
        } catch {
            log('No Pop Up Turn Off Notification')
        }

        log('Search')
        await this.page.waitForSelector('input.XTCLo.x3qfX')
        await this.page.type('input.XTCLo.x3qfX', this.pageName, {delay: this.typeSpeed})
        await this.page.waitForTimeout(2000)
        await this.page.evaluate(() => {
            document.querySelectorAll('.-qQT3')[0].click()
        })


        log('Open Last Post')
        await this.page.waitForTimeout(2000)
        await this.page.waitForSelector('div.v1Nh3.kIKUG._bz0w')
        await this.page.click('div.v1Nh3.kIKUG._bz0w a')

        log('Like')
        await this.page.waitForTimeout(2000)
        await this.page.waitForSelector('.wpO6b')
        await this.page.evaluate(() => {
            document.querySelectorAll('.wpO6b')[2].click()
        })

        log('Save')
        await this.page.waitForTimeout(2000)
        await this.page.evaluate(() => {
            document.querySelectorAll('.wpO6b')[5].click()
        })

        log('Exit')
        await this.page.waitForTimeout(2000)
        await this.page.evaluate(() => {
            document.querySelectorAll('.wpO6b')[6].click()
        })

        log('Goodbye')
        await this.page.waitForSelector('input.XTCLo.x3qfX')
        await this.page.type('input.XTCLo.x3qfX', 'Hope You Had Fun 💜', {delay: this.typeSpeed})

        this.finally()
    }

    finally() {
        log('End!')
        // await browser.close();
    }
}

const userName = 'EMAIL_OR_USERNAME'
const passWord = 'PASSWORD'
const pageName = 'PROFILE_NAME'
const newPuppe = new Instagram(userName, passWord, pageName);
newPuppe.start()


