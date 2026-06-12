from machine import Pin, PWM
from utime import sleep

led = PWM(Pin(16, Pin.OUT))
bot = Pin(17, Pin.IN)

led.freq(1000)
led.duty_u16(0)

ultimo_estado = 0
estado_led = False


while True:
    print(bot.value())
    sleep(0.2)
    
    estado_atual = bot.value()
    
    if estado_atual == 1 and ultimo_estado == 0:
        estado_led = not estado_led
        
        if estado_led:
            for liga in range (0, 65535, 3000):
                led.duty_u16(liga)
                sleep(0.2)
                
            else:
                for desliga in range (65535, -1, -3000):
                    if desliga < 0 : desliga = 0
                    led.duty_u16(desliga)
                    sleep(0.2)
                
            
    

