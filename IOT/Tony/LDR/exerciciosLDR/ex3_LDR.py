from machine import Pin, ADC
from utime import sleep

ldr = ADC(26)
led = Pin(16, Pin.OUT)

led.value(0)

while True:
    leitura_luz =  ldr.read_u16()
    print(leitura_luz)
    
    if (leitura_luz <= 20000):
        led.value(1)
        print("Led ascende")
    else:
        led.value(0)
        
    sleep(0.5)
